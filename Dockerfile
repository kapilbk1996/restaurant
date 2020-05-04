FROM centos:7

MAINTAINER kapilbk1996@gmail.com

# Install MongoDB
RUN yum -y install wget git \
    && wget http://downloads.mongodb.org/linux/mongodb-linux-x86_64-3.2.22.tgz -P / \
	&& tar -zxvf /mongodb-linux-x86_64-3.2.22.tgz \
    && rm -f /mongodb-linux-x86_64-3.2.22.tgz \
	&& yum clean all

# Install NVM(Node)
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash \
  && source ~/.bashrc \
  && nvm install v12.13.0 \
  && nvm version \
  && npm version \
  && npm install

ENV PATH=$PATH:"/mongodb-linux-x86_64-3.2.22/bin"

COPY backend/ /backend/
COPY frontend/ /frontend/

RUN export NVM_DIR="/root/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && cd /backend \
    && npm install --save \
    && cd /frontend \
    && npm install --save

COPY startUpScript.sh /
COPY restaurantsa9126b3.csv /

WORKDIR /

RUN chmod 777 startUpScript.sh \
    && mkdir -p /data/db


CMD ["/bin/bash","-c","/startUpScript.sh && tail -f /dev/null"]