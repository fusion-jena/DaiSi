# Dai:Si

First, the source code contains sensitive data (credentials) for the authentication provider at the GWDG. We need to clean that before publishing this. If you want to get this repository running, you need to modify one file within your operating system, as well as the script of Angular deployment.

## Pre-Requisites & Local Deployment

Regardless of the operating system, certain programs or libraries are required for the operation of Dai:Si. The following section deals with these dependencies and describes the setup with respect to a Windows-based computer/server.

### NodeJS

Please go to [NodeJS](https://nodejs.org/dist/), download and install an appropriate version of NodeJS. For comparison, please have a look at the current version which I use. Additionally, with the following command, you are able to verify the version you have installed.

> $ node --version \
> 14.18.1

Besides NodeJS, npm is also installed. You can also easily check the version.

> $ npm --version \
> 6.14.15

You would have to do this before the first execution anyway.

> $ npm i

Please use the following command to run the application.

> node app.js

### Angular

Based on the project, all necessary packages should be fetched. To do this, you need to run the following command in the appropriate folder. You would have to do this before the first execution anyway.

> $ npm i

Please use the following command to run the application.

> ng serve --open --disable-host-check

### MySQL / MariaDB

Please have a look at the section [XAMPP](#XAMPP).

### XAMPP

If you are using a Windows operating system, installing XAMPP is worthwhile for several reasons. First, the package includes an instance of MySQL/MariaDB with appropriate tooling (e.g. phpMyAdmin,...).

On the other hand Apache is included within XAMPP, which can be used as a reverse proxy to run both applications (angular & nodejs). Please open the file "httpd-vhosts.conf" within your XAMPP environment ({path/to/xampp}/apache/conf/extra/httpd-vhosts.conf) and add the following lines to the end of the file.

```config
<VirtualHost *:80>

ServerName dev.gfbio.uni-jena.de
ServerAdmin sven.thiel@uni-jena.de

RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

</VirtualHost>

<VirtualHost *:443>

DocumentRoot "C:/xampp/htdocs"
ServerName dev.gfbio.uni-jena.de
SSLEngine on
SSLCertificateFile "C:/xampp/apache/crt/dev.gfbio.uni-jena.de/server.crt"
SSLCertificateKeyFile "C:/xampp/apache/crt/dev.gfbio.uni-jena.de/server.key"
ServerAdmin sven.thiel@uni-jena.de


ProxyPass           /excluded !
ProxyPreserveHost   On
RequestHeader set X-Forwarded-Proto: "https"
ProxyRequests       Off
ProxyTimeout        600

ProxyPass "/daisi/" "http://localhost:4200/"
ProxyPassReverse "/daisi/" "http://localhost:4200/"

ProxyPass "/daisi-api/" "http://localhost:3000/"
ProxyPassReverse "/daisi-api/" "http://localhost:3000/"

</VirtualHost>
```

In addition, the applications must run under https. Now that we have set up the individual hosts in Apache, the only missing piece is the creation and integration of a valid certificate. Please copy both files from "search2.0/setup/certificate" into "{path/to/xampp}/apache/crt/" and execute "make-cert.bat" afterwards.

### hosts @ Windows

Please add the following information at the end of your "hosts" file. Within Windows, you will find that file "C:\Windows\System32\drivers".

> 127.0.0.1 dev.gfbio.uni-jena.de

This ensures, that your local machine is acting like the public domain "dev.gfbio.uni-jena.de" and Keycloak should accept your requests. Within "package,json", you will find a script "openid" for easy use. So you are able to start it directly from Visual Studio Code.

## OpenID Connect (via Keycloak)

First, the source code contains sensitive data (credentials) for the authentication provider at the GWDG. We need to clean that before publishing this. If you want to get this repository running, you need to modify one file within your operating system, as well as the script of Angular deployment.

## Diagram

![Diagram](search2.0/DatasetSearch/src/assets/img/diagram.png)

After retrieving the results, it is mapped to the result class.
<br />The orange rectangels are classes.
<br />The blue ellipses are attributes.
 
<br />The result class contains 5 attributes and two classes (Hit, Aggrigation).
<br />The Aggrigation class contains 3 attributes and one class (Facet). 
<br />The Facet contains 3 attributes.
<br />The Hit class contains 14 attributes and 4 classes(Upperlabel, Description, Citation, Linkage).
<br />The UpperLabel contains 3 attributes.
<br />The Description contains 2 attributes.
<br />The Citation contains 6 attributes.
<br />The linkage contains 3 attributes.
