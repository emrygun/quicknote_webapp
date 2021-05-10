FROM python:3.7.2
WORKDIR /app
ADD . /app
COPY requirements.txt /backend/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt
COPY . .
