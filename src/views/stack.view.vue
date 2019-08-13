<template>
	<div>
		<v-container>
			<v-flex md12 lg8 offset-lg2>
				<h1>Services</h1>
				<div class="v-spacer-5"></div>
				<services
					:services="services"
					:loading="loading"
					@open-exec-dialog="openExecDialog"
					@open-log-results="getContainerLogs"
					@delete-service="showDeleteServiceDialog"
					@add-service="showAddServiceDialog = true"
					@reload-services="reloadServices"
					@update-stack="showUpdateStackDialog"
				></services>
				<exec-dialog
					:dialog="showExecDialog"
					:id="containerId"
					@close="showExecDialog = false"
					@success="execSuccessful"
					@failed="execFailed"
				></exec-dialog>
				<exec-results
					:dialog="showExecResults"
					:data="execData"
					@close="showExecResults = false"
				></exec-results>
				<log-results
					:dialog="showLogResults"
					:logs="containerLogs"
					@close="showLogResults = false"
				></log-results>
				<add-service-dialog
					:dialog="showAddServiceDialog"
					@close="showAddServiceDialog = false"
					@success="reloadServices"
				></add-service-dialog>
				<custom-dialog
					:dialog="showDialog"
					:loading="loadingDialog"
					:title="dialogTitle"
					:content="dialogContent"
					:button="dialogButton"
					@close="showDialog = false"
					@confirm="confirmDialog"
				></custom-dialog>
			</v-flex>
		</v-container>
	</div>
</template>

<script>
import * as _ from 'lodash';

import ContainerApi from '@/api/container.api';
import DeployApi from '@/api/deploy.api';
import ServiceApi from '@/api/service.api';
import ExecDialog from '@/components/exec-dialog.component';
import ExecResults from '@/components/exec-results.component';
import LogResults from '@/components/log-results.component';
import Services from '@/components/services.component.vue';
import CustomDialog from '@/components/custom-dialog.component';
import AddServiceDialog from '@/components/add-service-dialog.component';

export default {
	name: 'stack-view',
	components: {
		ExecDialog,
		ExecResults,
		LogResults,
		Services,
		CustomDialog,
		AddServiceDialog,
	},
	data () {
		return {
			services: [],
			reloadServicesInterval: null,
			stackUpdateInterval: null,
			loading: true,
			containerId: null,
			showExecDialog: false,
			showExecResults: false,
			showLogResults: false,
			containerLogs: {
				msg: '',
				output: '',
			},
			stackUpdateFailed: false,
			stackUpdateTaskId: null,
			showAddServiceDialog: false,
			execData: {
				message: '',
				results: null,
			},
			showDialog: false,
			loadingDialog: false,
			dialogTitle: '',
			dialogContent: '',
			dialogButton: '',
			dialogCallback: null,
			dialogCallbackData: null,
		};
	},
	computed: {
		serviceNames() {
			return _.map(this.services, (service) => service.name);
		},
	},
	methods: {
		openExecDialog(containerId) {
			this.containerId = containerId;
			this.showExecDialog = true;
		},
		getContainerLogs(containerId) {
			this.containerId = containerId;
			ContainerApi.getLogs(containerId).then((response) => {
				this.containerLogs = response.data;
				this.showLogResults = true;
			});
		},
		execSuccessful(execData) {
			this.execData = execData;
			this.showExecResults = true;
		},
		execFailed(execData) {
			this.execData = execData;
			this.showExecResults = true;
		},
		reloadServices() {
			ServiceApi.getServices().then((response) => {
				this.loading = false;
				this.services = response.data;
			});
		},
		updateStack() {
			this.loadingDialog = true;
			this.stopServicePolling();
			DeployApi.updateStack(this.serviceNames).then((response) => {
				this.startStackUpdateChecker(response.data['task_id']);
			}).catch(() => {
				this.startServicePolling();
			});
		},
		checkStackUpdate() {
			DeployApi.checkStackUpdate(this.stackUpdateTaskId).then((response) => {
				if (response.status === 200) {
					this.stopStackUpdateChecker();
					this.stackUpdateFinished(response.data, false);
				}
			}).catch((error) => {
				this.stopStackUpdateChecker();
				if (error.response && error.response.data) {
					this.stackUpdateFinished(error.response.data, true);
				} else {
					this.stackUpdateFinished({ 'err': 'Stack update failed', 'msg': 'Unknown error' }, true);
				}
			});
		},
		stackUpdateFinished(data, failed) {
			this.startServicePolling();
			if (failed) {
				this.dialogTitle = data.err;
				this.dialogContent = `<span class="text--red">${data.msg}</span>`;
			} else {
				this.dialogTitle = 'Stack update successful';
				this.dialogContent = data.msg;
			}
			this.dialogButton = null;
			this.showDialog = true;
		},
		showUpdateStackDialog() {
			this.dialogTitle = 'Update services?';
			this.dialogContent = 'This option will update and restart <strong>ALL</strong> services. Prepare for a few minutes of downtime';
			this.dialogButton = 'Update';
			this.dialogCallback = this.updateStack;
			this.dialogCallbackData = null;
			this.showDialog = true;
		},
		deleteService(name) {
			this.loadingDialog = true;
			ServiceApi.deleteService(name).then(() => {
				this.reloadServices();
				this.loadingDialog = false;
				this.showDialog = false;
			}).catch((error) => {
				this.loadingDialog = false;
				if (error.response && error.response.data) {
					this.dialogTitle = error.response.data.err;
					this.dialogContent = error.response.data.msg;
				} else {
					this.dialogTitle = 'Delete service failed';
					this.dialogContent = 'Unknown error';
				}
				this.dialogButton = false;
			});
		},
		showDeleteServiceDialog(name) {
			this.dialogTitle = 'Delete service?';
			this.dialogContent = `This will delete the <tt>${name}</tt> service from the list, but not stop it's containers. You can readd it later with the same or different options.`;
			this.dialogButton = 'Delete';
			this.dialogCallback = this.deleteService;
			this.dialogCallbackData = name;
			this.showDialog = true;
		},
		confirmDialog() {
			if (this.dialogCallbackData) {
				this.dialogCallback(this.dialogCallbackData);
			} else {
				this.dialogCallback();
			}
		},
		startServicePolling() {
			this.reloadServicesInterval = setInterval(this.reloadServices, 5000);
		},
		stopServicePolling() {
			window.clearInterval(this.reloadServicesInterval);
		},
		startStackUpdateChecker(taskId) {
			this.stackUpdateTaskId = taskId;
			this.loading = true;
			this.loadingDialog = false;
			this.showDialog = false;
			this.stackUpdateInterval = setInterval(this.checkStackUpdate, 5000);
		},
		stopStackUpdateChecker() {
			this.loading = false;
			window.clearInterval(this.stackUpdateInterval);
		},
	},
	mounted() {
		this.reloadServices();
		this.startServicePolling();
	},
	destroyed() {
		this.stopServicePolling();
	},
};
</script>

<style lang="stylus">
</style>

