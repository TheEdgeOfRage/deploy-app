#!/bin/sh

function deploy() {
	echo "Starting deploy"
	URL=$1
	SERVICES=$2
	output=$(curl -s -X POST "https://${url}/api/deploy" -H "Content-Type: application/json" -d ${SERVICES})
	task_id=$(echo $output | grep "task_id" | cut -d '"' -f 8)

	while true; do
		output=$(curl -s -X GET "https://${url}/api/tasks/${task_id}" -H "Accept: application/json")
		echo $output
		if ! echo $output | grep "Task is still running" >/dev/null; then
			break
		fi
		echo "Waiting for deploy to finish"
		sleep 5
	done

	echo "Deploy finished"
}

if [ ${BRANCH} = "master" ]; then
	deploy 'deploy-deploy.vivifyideas.com' '["deploy_app"]'
else
	echo "Branch ${BRANCH} is not deployable"
fi

