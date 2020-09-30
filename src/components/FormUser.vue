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
        v-if="!this.user_id"
        class="mr-4"
        @click="newUser()"
      >
        Crear
      </v-btn>
      <v-btn
        v-if="this.user_id"
        class="mr-4"
        @click="editUser()"
      >
        Editar
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
        job: null,
        user_id: null
      }
    },
    mounted() {
      this.user_id = this.$route.params.id;

      if(this.user_id) {
        this.axios.get(`https://reqres.in/api/users/${this.user_id}`)
          .then(res => {
            if(res.status === 200) {
              this.name = res.data.data.first_name;
            }
          }).catch( error => { return error; })
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
      editUser () {
        this.$refs.observer.validate().then( result => {
          if(!result) {
            return false;
          }else {
            this.axios.put(`https://reqres.in/api/users/${this.user_id}`, { 
              name: this.name, 
              job: this.job
            }).then( res => {
              if(res.status === 200) {
                this.$router.replace('/table');
              }
            }).catch( error => {
              if (error.response.status === 450) {
                this.errors = error.response.data
              }
            })
          }
        })
      }
    }
  }
</script>
