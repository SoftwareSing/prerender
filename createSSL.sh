openssl genrsa -out yourkey.pem 1024
openssl req -new -key  yourkey.pem -out  yourcsr.csr
openssl x509 -req -in yourcsr.csr -signkey yourkey.pem -out yourcert.pem
