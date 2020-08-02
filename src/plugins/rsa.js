 /* eslint-disable */ 
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
// const fs = require('fs');
 const prKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAgsRrmYvqFeXGntLRa/84Zx7I5iJkDYNVlCXCxr2WVAoYKkiQ
WW/jlDD4OEhKCZCJgVVGT43XxUkQ3sv7+eVO1MO1iSbMql96VSBLwybIfPrFjMXn
oXE4lgRy06lAmCSTmjvWZW6xrlGRwdkWNxIbktR6eRiI//ERKqhFM+XZ2ur/xTyv
28hZhj8UInyHJogfPiX/cal1dr/7GKzqyqUp/mRnta31hVZZsXb1LCQtynZI6pfU
KLZ7jok4L7Lm+S9+D3dhcMxBwJD15IjCDtQE37lhuaRWB72hOpNFXFEUWXl408SM
RyqbGPps/u+TEmstyo9qyUvdwWEbMg3GmE7MGQIDAQABAoIBADDBcWjffNjLQiHn
coO0td/k33zGp81OAXNqHNQizdDprpbdVUyzZgPTukip00j7pfkdxUhWF3QMSQj4
vysuLxUvHxlS6Q5A6QiiMP1DEY9fpJZXF4TfBP0SDYoTWe0f/hSMaOSKwB7BdPn0
qc7App05MazC1BmxVPg1ow+1jGONngwEKJU6597Uy/KYXjAFArCGXMqVsTfmGCE7
ZKgx8DWJzYg+IfuScDELzEbdKmMhdiQ4WBzaEbMpWGDwIL0zQnU3R7ARe/LAT/bp
quhPphBl60ezeHuB4V71eiKcTEpRgMcKErrUDl9sryZRiVZ0Ren/2lgU2CiJhDcQ
pbQxqoECgYEA3Qb14Zk8h4cADS8SYjX5NqElz9qbaz49Eai6XaqLhzdnPWG4xjFm
5yuTqBc+JN+aOVwOpgPGOtUkIMG3EA+84fL5m94GGekDK6/+ALNUQiGZBMIsCKZZ
iDULreUkh+XSzxrh7z+0IqVcaTAtOw9Wzmb/qCIpWzEmdVZMqYrQSTECgYEAl3VY
eUdcQTNHAJZbSl5/20f921Nuw3mx0OsQpvcmkgfJo8uTGVRpsV47wM0YurSHVQ10
95GXWgNBdFBRlbYkl8TYaEjTwRqyYLOmbSUz3O8jDx4kbwrkFVMyEZpUXIZH6Pb+
O4s14Qv1nZtPncGKe+IEyEeS/HTouNtxBV3Ld2kCgYBXbGNhAj1g1dL9Y/r/gZ27
L+5G0o7a0llRXM2qMsTRjOZ27uoo6m1rTl8vA1J/Pzo/KdxZafDEYH3TvwtrfO4W
6QY10pHTOckZRJlRKZ1QMv3VVgAYw8NyDpk6BQJ4Bj1l0ZpACZB0i7eLm5SoYZ7S
MQc6N5joCv7NNn9IKDHOYQKBgCZeKa1/cFVsAf6aGEI8sjMAh8R53ENUnsEH604A
qhqwMlp2BauTALtX3dc3nZ4egXIAWLMmhKrezEQE3MYKQDbaPOAeItZ2Rt3MZMqd
dAfx5HW98wjWP3VPgA2JhPlzYuAXQcwfteRuvSfR4ldaYhSD6yY5S3j8vL+nh3gO
jK6RAoGBAIH0DcgXaCaYSPvw7c/6SXtskZq4Obym5vHCQKkGDgtJd6K9CCKeVcGl
RqXzZEUP3PolQJE6kTph4WAdXBTT//VtY9V/k/BV8QGUU00SylwQjUc071E74are
nrFEwSFBl7H1CcAqpKTtlJcSy8B+Kic+b2LF+PgsES+c5176K3zj
-----END RSA PRIVATE KEY-----`
// var puKey = fs.readFileSync('./rsa.pub').toString();

async function sign(content) {
    const sign = crypto.createSign('RSA-SHA256')
    console.log(sign);
  const signature = sign.update(content).sign(prKey, 'base64');
  console.log(signature);
  return signature;

}

async function verify(content, signature) {
    let key = new NodeRSA(puKey);
    let status = key.verify(content, signature);
    return status;
}   

module.exports = {
    sign,
    verify
}