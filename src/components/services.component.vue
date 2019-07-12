<template>
	<v-data-table
		:headers="headers"
		:items="services"
		:expand="expand"
		:loading="loading"
		class="elevation-1"
		hide-actions
	>
		<v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
		<template v-slot:items="props">
			<tr @click="props.expanded = !props.expanded">
				<td class="text-lg-center">{{ props.item.name }}</td>
				<td class="text-lg-center">{{ props.item.repository }}</td>
				<td class="text-lg-center">{{ props.item.tag }}</td>
				<td class="text-lg-center">
					<v-icon :class="{'red--text': !props.item.active, 'green--text': props.item.active}">fas fa-circle</v-icon>
				</td>
			</tr>
		</template>
		<template v-slot:expand="props">
			<v-card flat>
				<v-card-text
					v-for="container in props.item.containers"
					:key="container.short_id"
					class="docker-container"
					:class="getContainerClass(container.status)"
				>
					<span>
						<span>{{ container.short_id }}</span><span class="dash-space">-</span><span>{{ container.name }}</span>
					</span>
					<v-spacer></v-spacer>
					<v-btn @click="$emit('open-log-results', container.id)">logs</v-btn>
					<v-btn @click="$emit('open-exec-dialog', container.id)">exec</v-btn>
				</v-card-text>
			</v-card>
		</template>
		<template v-slot:footer>
			<td :colspan="headers.length">
				<div class="actions">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn flat icon color="blue darken-1" @click="$emit('reload-services')" v-on="on">
								<v-icon>fas fa-redo-alt</v-icon>
							</v-btn>
						</template>
						<span>Reload Services</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn flat icon color="yellow darken-3" @click="$emit('update-stack')" v-on="on">
								<v-icon>fas fa-sync-alt</v-icon>
							</v-btn>
						</template>
						<span>Update Stack</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn flat icon color="green darken-1" @click="$emit('new-service')" v-on="on">
								<v-icon>fas fa-plus</v-icon>
							</v-btn>
						</template>
						<span>Add Service</span>
					</v-tooltip>
				</div>
			</td>
		</template>
	</v-data-table>
</template>

<script>
export default {
	name: 'services',
	data() {
		return {
			expand: false,
			fab: false,
			headers: [
				{ text: 'Service name', value: 'name', align: 'center', sortable: false },
				{ text: 'Image', value: 'repository', align: 'center', sortable: false },
				{ text: 'Tag', value: 'tag', align: 'center', sortable: false },
				{ text: 'Active', value: 'acitve', align: 'center', sortable: false },
			],
		};
	},
	props: [
		'services',
		'loading',
	],
	methods: {
		getContainerClass(status) {
			switch (status) {
				case 'running':
					return 'green--text text--darken-1';
				case 'exited':
				case 'dead':
					return 'red--text text--darken-1';
				default:
					return 'yellow--text text--darken-1';
			}
		},
	},
};
</script>

<style lang="stylus">
table.v-table thead th, table.v-table tbody td
	font-size 1rem

.docker-container
	padding 0 1rem
	display flex
	align-items center
	background-color #383838

	.dash-space
		margin 0 1rem

.actions
	display flex
	justify-content flex-end
</style>

