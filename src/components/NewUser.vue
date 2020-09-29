<template>
  <validation-observer
    ref="observer"
  >
    <form>
      <validation-provider
        v-slot="{ errors }"
        name="nombre"
        :rules="{ required: true }"
      >
        <v-text-field
          v-model="name"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="trabajo"
        :rules="{ required: true }"
      >
        <v-text-field
          v-model="job"
          :error-messages="errors"
          label="Job"
          required
        ></v-text-field>
      </validation-provider>

      <v-btn
        class="mr-4"
        @click="newUser()"
      >
        Enviar
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full';

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data () {
      return {
        name: null,
        job: null
      }
    },
    methods: {
      newUser () {
        this.$refs.observer.validate().then( result => {
          if(!result) {
            return false;
          }else {
            this.axios.post('https://reqres.in/api/users', { 
              name: this.name, 
              job: this.job
            }).then( res => {
              if(res.status === 201) {
                this.$router.replace('/table');
              }
            }).catch( error => {
              if (error.response.status === 450) {
                this.errors = error.response.data
              }
            })
          }
        })
      },
    }
  }
</script>
