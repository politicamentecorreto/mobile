import { Component, ViewChild } from '@angular/core';
import { Slides, Nav, NavController } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { Politico } from './../../app/politico/politico'
import { Detalhes } from './../detalhes/detalhes'
import { Parse } from 'parse';

@Component({
  selector: 'principal',
  templateUrl: 'principal.html'
})
export class Principal {

  polis: Politico[];
  filtro: Boolean;
  busca;

  constructor(public nav: NavController) {
    Parse.initialize('OBH1UBDdv4al3h2Br8qJOFTfyCyMIw816hnooZf3', 's5X6vSQRWTMbRlPPuLceKWHOxpKTpXpaimXQZM2v');
    Parse.serverURL = 'https://parseapi.back4app.com/';
    this.gerarPoliticos();
    this.filtro = false;
    this.busca = "";
  }

  openPage(politico: Politico) {
    this.nav.push(Detalhes, { polit: politico });
  }


  slideOpcoes = {
    initialSlide: 1,
    loop: true,
    direction: 'horizontal',
    pager: true,
    speed: 2000,
    autoplay: 10

  };

  filtrar() {
    Toast.show("Ola Tudo Bem", '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  buscar(ev: any) {
    this.busca = this.polis;
    var val = ev.target.value;
    if (val.length > 0) {
      this.filtro = true;
    } else {
      this.filtro = false;
    }

    if (val && val.trim() != '') {
      this.busca = this.busca.filter((politico) => {
        return (politico.apelido.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  cancelar(ev) {
    this.filtro = false;
  }

  clear(ev) {
    //Não pode apagar
  }

  gerarPoliticos() {
    var Politico = Parse.Object.extend('Politico', 'Partido', 'Cargo');
    var query = new Parse.Query(Politico);
    query.include('partido');
    query.include('cargo');
    query.find().then(function (results) {
      var politicos: Politico[] = [];
      for (var i = 0; i < results.length; i++) {
        var politico: Politico;
        console.log(results[i].get('processo'));
        politico = {
          id:results[i].id,
          nome: results[i].get('nome'),
          sexo: ((results[i].get('sexo') == 'F') ? 'Feminino' : 'Masculino'),
          telefone: results[i].get('telefone'),
          gabinete: results[i].get('gabinete'),
          partido: results[i].get('partido').get('sigla'),
          partidofoto: results[i].get('partido').get('logo').url(),
          site: results[i].get('site'),
          cidade: results[i].get('cidade'),
          escolaridade: results[i].get('escolaridade'),
          projeto: results[i].get('projeto'),
          processoDescricao: results[i].get('escolaridade'),
          processoTitulo: results[i].get('escolaridade'),
          popularidade: results[i].get('popularidade'),
          anexo: results[i].get('anexo'),
          status: results[i].get('status'),
          foto: results[i].get("fotoCard").url(),
          dataNascimento: results[i].get('dataNascimento'),
          linkpolitico: results[i].get('linkpolitico'),
          numero: results[i].get('numero'),
          email: results[i].get('email'),
          apelido: results[i].get('apelido'),
          ocupacao: results[i].get('ocupacao'),
          fotoCapa: results[i].get("fotoCapa").url(),
          cargo: results[i].get("cargo").get("descricao")
        }
        politicos.push(politico);
      }
      return politicos;
    }).then(politicos => {
      this.polis = politicos;
    });
  }

}
