<template>
	<div>
		<b-form @reset="onReset" v-if="show">
			<h3>ID y las veces requeridas debe ser secuencial</h3>
			<b-form-group id="input-group-1" label="ID de la Mision" label-for="input-1">
				<b-form-input id="input-1" v-model="form.taskId" type="number" placeholder="Numero" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-2" label="¿Cuántas veces necesita hacer la mision?" label-for="input-2">
				<b-form-input id="input-2" v-model="form.requiredcount" type="number" placeholder="Numero" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-3" label="Cantidad de XP dada al terminar la mision" label-for="input-3">
				<b-form-input id="input-3" v-model="form.rewardXP" type="number" placeholder="Numero" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-4" label="Título de la Mision" label-for="input-4">
				<b-form-input id="input-4" v-model="form.taskTitle" placeholder="Texto" required></b-form-input>
			</b-form-group>

			<b-form-group id="input-group-5" label="Descripcion de la Mision" label-for="input-5">
				<b-form-input id="input-5" v-model="form.taskDescription" placeholder="Texto" required></b-form-input>
			</b-form-group>

			<hr />
			<b-button @click="convertToLua" variant="success">Convertir a LUA</b-button>
			<b-button type="reset" variant="danger">Borrar campos</b-button>
		</b-form>
		<b-card class="mt-3" header="Data legible (JSON)">
			<pre class="m-0">{{ form2 }}</pre>
		</b-card>
		<hr>
		<b-button @click="copyJSON" variant="success" v-if="generatedLua">Copiar al portapapeles (JSON)</b-button>
		<b-card class="mt-3" header="Data para copiar (LUA)">
			<span id="luaCopy"> {{ luaObj }}, </span>
		</b-card>
		<hr>
		<b-button @click="copyLua" variant="success" v-if="generatedLua">Copiar al portapapeles (LUA)</b-button>
	</div>
</template>

<script>
var jsonToLua = require("json_to_lua");
export default {
	data() {
		return {
			luaObj: "",
			form: {
				taskId: null,
				requiredcount: null,
				rewardXP: null,
				taskTitle: "",
				taskDescription: "",
			},
			form2: {
				taskId: null,
				requiredcount: null,
				rewardXP: null,
				taskTitle: "",
				taskDescription: "",
			},
			show: true,
			generatedLua: false,
			toastCount: 0
		};
	},
	methods: {
		convertToLua() {
			this.form.taskId = parseInt(this.form.taskId);
			this.form.requiredcount = parseInt(this.form.requiredcount);
			this.form.rewardXP = parseInt(this.form.rewardXP);
			this.form2 = this.form;
			this.luaObj = jsonToLua.jsObjectToLua(this.form);
			this.generatedLua = true;
		},
		copyLua() {
			// Copy the text inside the text field
			navigator.clipboard.writeText(this.luaObj).then(() => {
				this.showToast('Éxito', 'Copiado al portapapeles en formato LUA');
			});
		},
		copyJSON() {
			// Copy the text inside the text field
			navigator.clipboard.writeText(JSON.stringify(this.form2)).then(() => {
				this.showToast('Éxito', 'Copiado al portapapeles en formato JSON');
			});
		},
		showToast(title, message) {
			// Use a shorter name for this.$createElement
			const h = this.$createElement
			// Increment the toast count
			this.toastCount++
			// Create the message
			const vNodesMsg = h(
				'p',
				{ class: ['text-center', 'mb-0'] },
				[
					h('b-spinner', { props: { type: 'grow', small: true } }),
					message,
					h('b-spinner', { props: { type: 'grow', small: true } })
				]
			)
			// Create the title
			const vNodesTitle = h(
				'div',
				{ class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
				[
					h('strong', { class: 'mr-2' }, title),
				]
			)
			// Pass the VNodes as an array for message and title
			this.$bvToast.toast([vNodesMsg], {
				title: [vNodesTitle],
				solid: true,
				variant: 'success'
			})
		},
		onReset(event) {
			event.preventDefault();
			// Reset our form values
			this.form.taskId = null;
			this.form.requiredcount = null;
			this.form.rewardXP = null;
			this.form.taskTitle = "";
			this.form.taskDescription = "";
			this.luaObj = "";
			this.generatedLua = false;
		},
	},
};
</script>

<style lang="scss">
.home {
	width: 50%;
	margin: auto;
	padding-bottom: 25px;

	hr {
		border-color: #fff;
	}

	label, h3, h2, small {
		color: #fff;
	}
}
</style>
