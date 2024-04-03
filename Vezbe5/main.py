import wsgiref #web server gateway interface, sluzi kao posrednik koji prosledjuje HTTP zahteve nasoj aplikaciji
from wsgiref import simple_server
import re

def application(environ, start_response): #environ - informacije iz HTTP zahteva
    #response = b"Hello World!" #niz bajtova koji se ispisuje kao server response
    path = environ['PATH_INFO']
    method = environ['REQUEST_METHOD']
    if path == "/obradi" and method == "POST":
        request_body_size = int(environ['CONTENT_LENGTH'])
        request_body_str = environ['wsgi.input'].read(request_body_size).decode("utf-8")
        request_body = dict(re.findall(r'(\w+)=(\w+)&',request_body_str))
        print(request_body)
        status = "200 OK"
        response = "<h1>" + request_body['tekst'] + "</h1> <p>" + request_body['meni'] + "</p>"
        response = response.encode()
        #obradjujem formu sa index.html
    elif path == "/":
        with open("index.html", "r") as f:
            response= f.read().encode() #otvorimo html fajl i citamo ga kao niz bajtova
    else:
        response = b"Not found!"
        status = "404 Not Found"
    status = "200 OK" #resurs trazen na serveru je postojeci i u regularnom stanju
    headers = [("Content-Type", "text/html"), ("Content-Length", str(len(response)))] #opis header responsa
    start_response(status, headers) #pokretanje responsa
    return [response] #povratna vrednost funkcije !! MORA U NIZU

if __name__ == '__main__':
    server = wsgiref.simple_server.make_server(
        host="localhost", #lokalni server - za testiranje
        port=8000, #port kojim se sluzimo
        app=application #aplikacija kojoj se prosledjuju HTTP requestovi
    )
    server.serve_forever() #da moze da opsluzi zahteve uvek - program se ne ugasi posle jednog samo