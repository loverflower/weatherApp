start_env:
	cd local_env; docker-compose up -d --build


kill_env:
	( \
	set +e; \
	docker-compose -f local_env/docker-compose.yaml kill; \
	set -e; \
	)

clean_env:
	( \
	set +e; \
	docker container prune -f; \
	docker volume prune -f; \
	docker network prune -f; \
	set -e; \
	)