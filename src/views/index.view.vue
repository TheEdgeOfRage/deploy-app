<template>
	<v-container>
		<v-flex md12 lg8 offset-lg2>
			<h2>Services</h2>
			<div class="v-spacer-5"></div>
			<service
				:services=services
				:loading="loading"
				@open-exec-dialog="openExecDialog"
			></service>
			<exec-dialog
				:dialog="showExecDialog"
				:id="id"
				@close="closeExecDialog"
				@success="execSuccessful"
				@failed="execFailed"
			></exec-dialog>
			<exec-results
				:dialog="showExecResults"
				:data="data"
				:failed="failed"
				@close="closeExecResults"
			></exec-results>
		</v-flex>
	</v-container>
</template>

<script>
import ServiceApi from '@/api/service.api';
import Service from '@/components/service.component';
import ExecDialog from '@/components/exec-dialog.component';
import ExecResults from '@/components/exec-results.component';

export default {
	name: 'Index',
	components: {
		ExecDialog,
		ExecResults,
		Service,
	},
	data () {
		return {
			services: [],
			loading: true,
			showExecDialog: false,
			id: null,
			showExecResults: false,
			data: {
				message: '',
				results: null,
			},
			failed: false,
		};
	},
	methods: {
		openExecDialog(id) {
			this.id = id;
			this.showExecDialog = true;
		},
		closeExecDialog() {
			this.showExecDialog = false;
		},
		closeExecResults() {
			this.showExecResults = false;
		},
		execSuccessful(data) {
			this.data = data;
			this.failed = false;
			this.showExecResults = true;
		},
		execFailed(data) {
			this.data = data;
			this.failed = true;
			this.showExecResults = true;
		},
	},
	mounted() {
		ServiceApi.get().then((response) => {
			this.services = response.data;
			this.loading = false;
		});
	},
};
</script>

<style lang="stylus">

</style>
