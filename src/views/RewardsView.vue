<template>
	<div class="rewards">
		<b-form @submit="onSubmit" @reset="onReset" v-if="show">
			<b-form-group id="input-group-1" label="ID de la Mision" label-for="input-1">
				<b-form-input id="input-1" v-model="formReward.taskId" type="number" placeholder="Numero" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-2" label="¿Cuántas veces necesita hacer la mision?" label-for="input-2">
				<b-form-input id="input-2" v-model="formReward.requiredcount" type="number" placeholder="Numero"
					required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-2" label="Cantidad de XP dada al terminar la mision" label-for="input-2">
				<b-form-input id="input-2" v-model="formReward.rewardXP" placeholder="Numero" required></b-form-input>
			</b-form-group>

			<b-form-group id="input-group-2" label="Título de la Mision" label-for="input-2">
				<b-form-input id="input-2" v-model="formReward.taskTitle" placeholder="Texto" required></b-form-input>
			</b-form-group>

			<b-form-group id="input-group-2" label="Descripcion de la Mision" label-for="input-2">
				<b-form-input id="input-2" v-model="formReward.taskDescription" placeholder="Texto" required>
				</b-form-input>
			</b-form-group>

			<hr>
			<b-button type="submit" variant="success">Convertir a LUA</b-button>
			<b-button type="reset" variant="danger">Borrar campos</b-button>
		</b-form>
		<b-card class="mt-3" header="Data legible">
			<pre class="m-0">{{ formReward }}</pre>
		</b-card>

		<b-card class="mt-3" header="Data para copiar">
			<span> {{formReward}}, </span>
		</b-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formReward: {
				taskId: null,
				requiredLevel: null,
				rewards: {
					standart: {
						itemLabel: "",
						itemName: "",
						type: "",
						count: null,
						unique: false,
						image: ""
					},
					premium: {
						itemLabel: "",
						itemName: "",
						type: "",
						count: null,
						unique: false,
						image: ""
					}
				},
				taskTitle: "",
				taskDescription: "",
			},
			show: true,
		};
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			// alert(JSON.stringify(this.form));

		},
		onReset(event) {
			event.preventDefault();
			// Reset our form values
			this.form.taskId = null;
			this.form.requiredcount = null;
			this.form.rewardXP = null;
			this.form.taskTitle = "";
			this.form.taskDescription = "";
			// Trick to reset/clear native browser form validation state
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		},
	},
};
</script>

<style lang="scss">
.rewards {
	width: 50%;
	margin: auto;

	hr {
		border-color: #fff;
	}

	label {
		color: #fff;
	}
}
</style>
