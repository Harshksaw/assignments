FROM postgres:latest

RUN mkdir -p /docker-entrypoint-initdb.d

COPY entrypoint.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/entrypoint.sh

ENV POSTGRES_PASSWORD=your_password  # Set a strong password
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=your_database_name

ENTRYPOINT ["docker-entrypoint.sh", "postgres"]
