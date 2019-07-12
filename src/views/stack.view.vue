<template>
	<div>
		<v-container>
			<v-flex md12 lg8 offset-lg2>
				<h1>Services</h1>
				<div class="v-spacer-5"></div>
				<services
					:services="services"
					:loading="loadingServices"
					@open-exec-dialog="openExecDialog"
					@open-log-results="getContainerLogs"
					@reload-services="reloadServices"
					@new-service="showNewServiceDialog = true"
					@update-stack="showUpdateStackDialog = true"
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
				<stack-update-results
					:dialog="showStackUpdateResults"
					:logs="stackUpdateLogs"
					:failed="stackUpdateFailed"
					@close="showStackUpdateResults = false"
				></stack-update-results>
				<update-stack-dialog
					:dialog="showUpdateStackDialog"
					:updating="updatingStack"
					@close="showUpdateStackDialog = false"
					@update-stack="updateStack"
				></update-stack-dialog>
			</v-flex>
		</v-container>
	</div>
</template>

<script>
import ContainerApi from '@/api/container.api';
import DeployApi from '@/api/deploy.api';
import ServiceApi from '@/api/service.api';
import ExecDialog from '@/components/exec-dialog.component';
import ExecResults from '@/components/exec-results.component';
import LogResults from '@/components/log-results.component';
import StackUpdateResults from '@/components/stack-update-results.component';
import Services from '@/components/services.component.vue';
import UpdateStackDialog from '@/components/update-stack-dialog.component';

export default {
	name: 'stack-view',
	components: {
		ExecDialog,
		ExecResults,
		LogResults,
		StackUpdateResults,
		Services,
		UpdateStackDialog,
	},
	data () {
		return {
			services: [],
			loadingServices: true,
			loadingExec: false,
			containerId: null,
			showExecDialog: false,
			showExecResults: false,
			showLogResults: false,
			containerLogs: {
				msg: '',
				output: '',
			},
			showUpdateStackDialog: false,
			showStackUpdateResults: false,
			stackUpdateLogs: {
				msg: '',
				err: '',
			},
			stackUpdateFailed: false,
			showNewServiceDialog: false,
			updatingStack: false,
			execData: {
				message: '',
				results: null,
			},
		};
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
			ServiceApi.get().then((response) => {
				this.loadingServices = false;
				this.services = response.data;
			});
		},
		updateStack() {
			this.updatingStack = true;
			DeployApi.updateStack().then((response) => {
				this.updatingStack = false;
				this.showUpdateStackDialog = false;
				this.showStackUpdateResults = true;
				this.stackUpdateLogs = response.data;
				this.stackUpdateFailed = false;
			}).catch((error) => {
				this.updatingStack = false;
				this.showUpdateStackDialog = false;
				if (error.response && error.response.data) {
					this.showStackUpdateResults = true;
					this.stackUpdateLogs = error.response.data;
					this.stackUpdateFailed = true;
				}
			});
		},
	},
	mounted() {
		this.reloadServices();
		this.reloadServicesInterval = setInterval(this.reloadServices, 2000);
	},
	unmounted() {
		window.clearInterwal(this.reloadServicesInterval);
	},
};
</script>

<style lang="stylus">
</style>

