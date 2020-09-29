<template>
  <v-container fluid>
    <v-simple-table>
      <template v-slot:default v-if="users">
        <thead>
          <tr>
            <th v-for="item in headers" :key="item.text">{{ item.text }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.first_name}}</td>
            <td>{{user.last_name}}</td>
            <td>{{user.email}}</td>
            <td><img :src="user.avatar" alt="avatar" class="avatar"></td>
            <td>
              <a @click="userId(user, 'modal-delete')">Eliminar</a> /
              <a @click="userId(user, 'modal-update')">Editar</a>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <b-row>
      <b-col sm="5">
        <span>Mostrar </span>
        <b-select class="col-sm-2" v-model="pageSize" @change="list" disabled>
            <option :value="6">6</option>
        </b-select>
        <span> resultados de {{total}}.</span>
      </b-col>
      <b-col align="right">
        <b-button :disabled="currentPage <= 1 ? true : false" variant="outline-dark" @click="prevPage">Anterior</b-button>
        <b-button :disabled="(currentPage*pageSize) >= total ? true : false" variant="outline-dark" @click="nextPage">Siguiente</b-button>
      </b-col>
    </b-row>

    <b-modal centered id="modal-delete" title="Borrar usuario" @ok="deleteUser(user.id)">
      <p>¿Estás seguro que desea eliminar a {{user.first_name}} {{user.last_name}}?</p>
    </b-modal>

    <b-modal centered id="modal-update" title="Editar usuario" @ok="updateUser(user.id)">
      <b-container>
        <b-row>
          <b-col sm="2">
            <label for="first_name">Nombre</label>
          </b-col>
          <b-col sm="8">
            <b-form-input type="text" name="first_name" v-model="user.first_name"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <label for="last_name">Apellidos</label>
          </b-col>
          <b-col sm="8">
            <b-form-input type="text" name="last_name" v-model="user.last_name"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <label for="email">Apellidos</label>
          </b-col>
          <b-col sm="8">
            <b-form-input type="email" name="email" v-model="user.email"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Id' },
          { text: 'Nombre' },
          { text: 'Apellidos' },
          { text: 'Email' },
          { text: 'Avatar' },
          { text: 'Acciones' }
        ],
        users: null,
        total: null,
        pageSize: 6,
        currentPage: 1,
        user: {
          id: null,
          first_name: null,
          last_name: null,
          email: null
        }
      }
    },
    mounted() {
      this.list();
    },
    methods: {
      list() {
        this.axios.get(`https://reqres.in/api/users?page=${this.currentPage}`)
          .then( res => {
            if(res.status === 200) {
              this.users = [];
              this.users = res.data.data;
              this.total = res.data.total
            }
          }).catch( error => { return error })
      },
      userId(user, modal) {
        this.axios.get(`https://reqres.in/api/users/${user.id}`)
          .then( res  => {
            if (res.status === 200) {
              this.user = res.data.data;
              this.$bvModal.show(modal);
            }
          }).catch(error => { return error })
      },
      deleteUser(id) {
        this.axios.delete(`https://reqres.in/api/users/${id}`)
          .then( res => {
            if (res.status === 204) {
              this.list();
            }
          }).catch(error => { return error })
      },
      nextPage() {
        if((this.currentPage*this.pageSize) < this.total) {
          this.currentPage++;
          this.list();
        }
      },
      prevPage() {
        if(this.currentPage > 1) {
          this.currentPage--;
          this.list();
        }
      }
    }
  }
</script>

<style>
  .avatar {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>