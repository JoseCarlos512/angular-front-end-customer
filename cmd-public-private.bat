Microsoft Windows [Versión 10.0.22000.493]
(c) Microsoft Corporation. Todos los derechos reservados.

C:\Users\HP>genrsa -out jwt.pem
"genrsa" no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.

C:\Users\HP>openssl genrsa -out jwt.pem
Generating RSA private key, 2048 bit long modulus (2 primes)
..........................................................+++++
...........................................................................................................................................+++++
e is 65537 (0x010001)

C:\Users\HP>openssl rsa -in jwt.pem
writing RSA key
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAySOJlEZls4tQQpjq3m/u61RHBUFJsDq3OXrmcPI1XU/5atoE
Y+cw0ASQoWdfdJBOAwVVGpTSzTRFlTMICcNG8qRwQX9DMRxOzME0x4XCYsS6WmY2
3Xj+STryLjPomzrKDrRw0+kKXUg7WtHxOnZ44I0kcEucHl4zA+0xv+IJsRvGPhLg
kxnjmlYsjjwzkRzrJbtJQB5HsF2Ugwvt34De2ipHUAI+AOc400SqtbJJoZyyDSe4
pFHuPFyhABSOJfBYENJitQt+5PyeE3POA8GIoizo9UmX3PTFdSzHzM2wGpqaS0nP
EDKyAX1L9YcXvvD0ghk41ouMg8E6CX9/Z8LTfwIDAQABAoIBAQC+h2tLiWPNL6pX
a4MQMfef87VSxQWIahYl3MVtOAJU4ezhyqNd/yG96pUWT1WclRVQxzxWcaM9vsYr
DqwOk2whbKLpaCO94ZLDYkEcvxfjd3cPKsPOB07ZD31ZRtKQOKAuTb6S/a1Tr5iJ
71USjCb0jr51oSnBmnm4vnbhzLxhhr+OWwwmhI1b7NzYfftcEVltPKsMK1Id2WA7
qDQERbvVxiMoSrAQuvU2clUf87cdMrKwqeXCrDeFdpZtDNrEw8fZjeIrQqDnrMw0
ZJTRBoB4D8xw2u37KxvX0aaMR3MM5sFngl867w1+B+0pL9sFgbFDbxNdHRkKw7pT
vigtEsQBAoGBAOubf1NJZTW6LzcjZqxOX34mfLA3e7n+pFS5rsFhs0d8XIaPwE7f
wieKflVVF+JZYdK59Uq33rFEXB68QxyrM6p8bZom8xkLsoouN3YqoWFxwcgq/DaP
b8usblt4H7cnJ1Zo3K8FWxAVvskSd7a0XgKoKBDwPdN7y+y2ayMc1+m1AoGBANqM
TC9Tqm+4lqAmXmtxIxPMezLcd/AY//yqL9jo+riBsDkre6GwRkvvJMSs1r7VQOB/
rmDO0Td8TGbvOBMwL7GubpDlkG4epKbCuap/R+63eicfHxE+ovepJmnVBIpJHfX4
UNuy5hz8BMyU0iICRi7Ljp7gTC4LzF+ztE+10zjjAoGBAIRiIvDRVKUTsGPy6EX4
438mcPkys7qWcg+JJcBS/UE1h2e0bgHjiFxfXQzlez4bqvOUuVb6aY6BMqGydqMt
LyKkN5FeQUnZYMBzp4Yl/feay5+FR6IAhniSso+Ct49Z2Kic0yMkhz5KeaDRV6K5
RfmIMrsRwiuKa9LdzOU117vhAoGAMjpIUCA0bZTI2Wm4DY1k+GnobpoI3p+ARbt/
X6S76qezro/1zAVNQqplkuX+PMGaNX5iv1EI+G2SyZ11D8PlUjq6ooaAGS7lvIXI
Ug0KpSx54H/gjgANSEoR0ATrFDUVs7AsNTH6fPLWz4XsfXB0XNDfqFf4aiTABcax
TBiHwO0CgYAfACT+ebpmdcDUDDBu3s6EScH3rjInV4TONG6zqqVFsazQVTO27v1O
1QedjyilpE3kvC5uBN6qH52wHzdt0zgLJweaS+8E5wzSCy26zPnI6lzdM0kVqkfN
BuHcufDur4GvU627Kn9BNl4n+Ign7mR/g0LKi3qvj2yjCCNgXmRJTw==
-----END RSA PRIVATE KEY-----

C:\Users\HP>openssl rsa -in jwt.pem -pubout
writing RSA key
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAySOJlEZls4tQQpjq3m/u
61RHBUFJsDq3OXrmcPI1XU/5atoEY+cw0ASQoWdfdJBOAwVVGpTSzTRFlTMICcNG
8qRwQX9DMRxOzME0x4XCYsS6WmY23Xj+STryLjPomzrKDrRw0+kKXUg7WtHxOnZ4
4I0kcEucHl4zA+0xv+IJsRvGPhLgkxnjmlYsjjwzkRzrJbtJQB5HsF2Ugwvt34De
2ipHUAI+AOc400SqtbJJoZyyDSe4pFHuPFyhABSOJfBYENJitQt+5PyeE3POA8GI
oizo9UmX3PTFdSzHzM2wGpqaS0nPEDKyAX1L9YcXvvD0ghk41ouMg8E6CX9/Z8LT
fwIDAQAB
-----END PUBLIC KEY-----

C:\Users\HP>