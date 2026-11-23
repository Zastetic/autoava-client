"""Servidor de teste: serve client-test/ e simula o AJAX do Moodle (core_user_get_users_by_field)."""
import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

ROOT = "/mnt/d/projetos_wsl/automateava/client-test"
RA_FALSO = "1234567"


class H(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def do_POST(self) -> None:
        u = urlparse(self.path)
        n = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(n) if n else b"{}"
        if u.path == "/lib/ajax/service.php":
            try:
                req = json.loads(raw)
            except Exception:
                req = [{}]
            metodo = (req[0] or {}).get("methodname", "")
            if metodo == "core_user_get_users_by_field":
                payload = [{"error": False, "data": [{
                    "id": 123456, "username": RA_FALSO, "fullname": "MARIA SOUZA DA SILVA",
                    "email": "maria@exemplo.test"
                }]}]
            else:
                payload = [{"error": True, "exception": {"errorcode": "invalido"}}]
            body = json.dumps(payload).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        self.send_error(404)

    def log_message(self, format, *args) -> None:  # noqa: A002
        pass


if __name__ == "__main__":
    porta = int(os.environ.get("MOCK_PORT", "8899"))
    print(f"mock em http://127.0.0.1:{porta} servindo {ROOT}", flush=True)
    ThreadingHTTPServer(("0.0.0.0", porta), H).serve_forever()
