<template>
	<div class="rewards">
		<b-form @reset="onReset" v-if="show">
			<h3>ID y Nivel debe ser secuencial</h3>
			<b-form-group id="input-group-1" label="ID de la Mision" label-for="input-1">
				<b-form-input id="input-1" v-model="formReward.taskId" type="number" placeholder="Numero" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-2" label="¿Nivel requerido para reclamar?" label-for="input-2">
				<b-form-input id="input-2" v-model="formReward.requiredLevel" type="number" placeholder="Numero"
					required>
				</b-form-input>
			</b-form-group>

			<h2>Recompensas</h2>
			<h3>• Gratuitas</h3>

			<b-form-group id="input-group-3" label="Etiqueta del item (Lo vera el usuario)" label-for="input-3">
				<b-form-input id="input-3" v-model="formReward.rewards.standart.itemLabel" placeholder="Texto" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-4" label="Nombre del item (Para givear)" label-for="input-4">
				<b-form-input id="input-4" v-model="formReward.rewards.standart.itemName" placeholder="Texto" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-5" label="Tipo de item" label-for="input-5">
				<b-form-select v-model="formReward.rewards.standart.type" :options="itemTypeOptions"></b-form-select>
			</b-form-group>

			<b-form-group id="input-group-6" label="Cantidad de la recompensa" label-for="input-6">
				<b-form-input id="input-6" v-model="formReward.rewards.standart.count" type="number" placeholder="Numero" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-7" label="¿Unico?" label-for="input-7"
				description="Si la opción es Verdadero, el servidor dará la recompensa objeto por objeto. Si la opción es Falso, el servidor dará la recompensa completa solo 1 vez. (En caso de duda, dejar en falso o preguntar al Angel)">
				<b-form-select v-model="formReward.rewards.standart.unique" :options="itemUniqueBool"></b-form-select>
			</b-form-group>

			<b-form-group id="input-group-8" label="Nombre de la imagen (Con extensión .png, .jpg, etc...)"
				label-for="input-8"
				description="La imagen hay que subirla en: [pase] > ak4y-battlepass > html > images">
				<b-form-input id="input-8" v-model="formReward.rewards.standart.image" placeholder="Texto" required>
				</b-form-input>
			</b-form-group>

			<h3>• Premium</h3>

			<b-form-group id="input-group-9" label="Etiqueta de la recompensa (Lo vera el usuario)" label-for="input-9">
				<b-form-input id="input-9" v-model="formReward.rewards.premium.itemLabel" placeholder="Texto" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-10" label="Nombre de la recompensa (Para givear)" label-for="input-10">
				<b-form-input id="input-10" v-model="formReward.rewards.premium.itemName" placeholder="Texto" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-11" label="Tipo de recompensa" label-for="input-11">
				<b-form-select v-model="formReward.rewards.premium.type" :options="itemTypeOptions"></b-form-select>
			</b-form-group>

			<b-form-group id="input-group-12" label="Cantidad de la recompensa" label-for="input-12">
				<b-form-input id="input-12" v-model="formReward.rewards.premium.count" type="number" placeholder="Numero" required>
				</b-form-input>
			</b-form-group>

			<b-form-group id="input-group-13" label="¿Unico?" label-for="input-13"
				description="Si la opción es Verdadero, el servidor dará la recompensa objeto por objeto. Si la opción es Falso, el servidor dará la recompensa completa solo 1 vez. (En caso de duda, dejar en falso o preguntar al Angel)">
				<b-form-select v-model="formReward.rewards.premium.unique" :options="itemUniqueBool"></b-form-select>
			</b-form-group>

			<b-form-group id="input-group-14" label="Nombre de la imagen (Con extensión .png, .jpg, etc...)"
				label-for="input-14"
				description="La imagen hay que subirla en: [pase] > ak4y-battlepass > html > images">
				<b-form-input id="input-14" v-model="formReward.rewards.premium.image" placeholder="Texto" required>
				</b-form-input>
			</b-form-group>

			<hr />
			<b-button @click="convertToLua" variant="success">Convertir a LUA</b-button>
			<b-button type="reset" variant="danger">Borrar campos</b-button>
		</b-form>
		<b-card class="mt-3" header="Data legible (JSON)">
			<pre class="m-0">{{ formReward2 }}</pre>
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
			itemUniqueBool: [
				{ value: false, text: 'Falso' },
				{ value: true, text: 'Verdadero' }
			],
			itemTypeOptions: [
				{ value: null, text: 'Elige una opción de la lista' },
				{ value: "item", text: 'Objeto' },
				{ value: "vehicle", text: 'Vehículo' },
				{ value: "money", text: 'Dinero' },
			],
			formReward: {
				taskId: null,
				requiredLevel: null,
				rewards: {
					standart: {
						itemLabel: "",
						itemName: "",
						type: null,
						count: null,
						unique: false,
						image: ""
					},
					premium: {
						itemLabel: "",
						itemName: "",
						type: null,
						count: null,
						unique: false,
						image: ""
					}
				},
			},
			formReward2: {
				taskId: null,
				requiredLevel: null,
				rewards: {
					standart: {
						itemLabel: "",
						itemName: "",
						type: null,
						count: null,
						unique: false,
						image: ""
					},
					premium: {
						itemLabel: "",
						itemName: "",
						type: null,
						count: null,
						unique: false,
						image: ""
					}
				},
			},
			show: true,
			generatedLua: false,
			toastCount: 0
		};
	},
	methods: {
		convertToLua() {
			this.formReward.taskId = parseInt(this.formReward.taskId);
			this.formReward.requiredLevel = parseInt(this.formReward.requiredLevel);
			this.formReward.rewards.standart.count = parseInt(this.formReward.rewards.standart.count);
			this.formReward.rewards.premium.count = parseInt(this.formReward.rewards.premium.count);
			this.formReward.rewards.standart.image = './image/' + this.formReward.rewards.standart.image;
			this.formReward.rewards.premium.image = './image/' + this.formReward.rewards.premium.image;
			this.formReward2 = this.formReward;
			this.luaObj = jsonToLua.jsObjectToLua(this.formReward);
			this.generatedLua = true;
		},
		copyLua() {
			navigator.clipboard.writeText(this.luaObj + ',').then(() => {
				this.showToast('Éxito', 'Copiado al portapapeles en formato LUA');
			});
		},
		copyJSON() {
			navigator.clipboard.writeText(JSON.stringify(this.formReward2) + ',').then(() => {
				this.showToast('Éxito', 'Copiado al portapapeles en formato JSON');
			});
		},
		showToast(title, message) {
			const h = this.$createElement
			this.toastCount++
			const vNodesMsg = h(
				'p',
				{ class: ['text-center', 'mb-0'] },
				[
					h('b-spinner', { props: { type: 'grow', small: true } }),
					message,
					h('b-spinner', { props: { type: 'grow', small: true } })
				]
			)
			const vNodesTitle = h(
				'div',
				{ class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
				[
					h('strong', { class: 'mr-2' }, title),
				]
			)
			this.$bvToast.toast([vNodesMsg], {
				title: [vNodesTitle],
				solid: true,
				variant: 'success'
			})
		},
		onReset(event) {
			event.preventDefault();
			this.formReward.taskId = null;
			this.formReward.requiredLevel = null;
			this.formReward.rewards.standart.itemLabel = "";
			this.formReward.rewards.standart.itemName = "";
			this.formReward.rewards.standart.type = null;
			this.formReward.rewards.standart.count = null;
			this.formReward.rewards.standart.unique = false;
			this.formReward.rewards.standart.image = "";
			this.formReward.rewards.premium.itemLabel = "";
			this.formReward.rewards.premium.itemName = "";
			this.formReward.rewards.premium.type = null;
			this.formReward.rewards.premium.count = null;
			this.formReward.rewards.premium.unique = false;
			this.formReward.rewards.premium.image = "";
			this.formReward2.taskId = null;
			this.formReward2.requiredLevel = null;
			this.formReward2.rewards.standart.itemLabel = "";
			this.formReward2.rewards.standart.itemName = "";
			this.formReward2.rewards.standart.type = null;
			this.formReward2.rewards.standart.count = null;
			this.formReward2.rewards.standart.unique = false;
			this.formReward2.rewards.standart.image = "";
			this.formReward2.rewards.premium.itemLabel = "";
			this.formReward2.rewards.premium.itemName = "";
			this.formReward2.rewards.premium.type = null;
			this.formReward2.rewards.premium.count = null;
			this.formReward2.rewards.premium.unique = false;
			this.formReward2.rewards.premium.image = "";
			this.luaObj = "";
			this.generatedLua = false;
		},
	},
};
</script>

<style lang="scss">
.rewards {
	width: 50%;
	margin: auto;
	padding-bottom: 25px;

	hr {
		border-color: #fff;
	}

	label,
	h3,
	h2,
	small {
		color: #fff !important;
	}
}
</style>
