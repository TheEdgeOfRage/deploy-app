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
				<td>{{ props.item.name }}</td>
				<td>{{ props.item.repository }}</td>
				<td>{{ props.item.tag }}</td>
				<td>{{ props.item.active }}</td>
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
					<span>{{ container.short_id }} - {{ container.name }}</span>
					<v-btn @click="$emit('open-exec-dialog', container.id)">exec</v-btn>
				</v-card-text>
			</v-card>
		</template>
	</v-data-table>
</template>

<script>
export default {
	name: 'service',
	data() {
		return {
			expand: false,
			headers: [
				{ text: 'Service name', value: 'name' },
				{ text: 'Image', value: 'repository' },
				{ text: 'Tag', value: 'tag' },
				{ text: 'Active', value: 'acitve' },
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
.docker-container
	padding 0 1rem
	display flex
	justify-content space-between
	align-items center
</style>

