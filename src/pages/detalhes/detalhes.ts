import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { Politico } from './../../app/politico/politico'
import { Processo } from './../../app/processos/processo'
import { Projeto } from './../../app/projetos/projeto'
import { Parse } from 'parse';
import { Principal } from './../principal/principal';


@Component({
    selector: 'detalhes',
    templateUrl: 'detalhes.html'
})

export class Detalhes {
    politico: Politico;
    segment;
    aba;
    rate;
    proces: Processo[];
    projetos: Projeto[];

    constructor(private params: NavParams) {
        Parse.initialize('OBH1UBDdv4al3h2Br8qJOFTfyCyMIw816hnooZf3', 's5X6vSQRWTMbRlPPuLceKWHOxpKTpXpaimXQZM2v');
        Parse.serverURL = 'https://parseapi.back4app.com/';
        this.politico = params.get("polit");
        this.aba = "visaoGeral";
        this.rate = 0;
        this.proces = [{
            descricao: "Lorem ipsum dolor sit amet consectur",
            link: "link",
            dataProcesso: "DD/MM/AAAA",
            titulo: "Processo 1"
        }, {
            descricao: "Lorem ipsum dolor sit amet consectur",
            link: "link",
            dataProcesso: "DD/MM/AAAA",
            titulo: "Processo 2"
        }, {
            descricao: "Lorem ipsum dolor sit amet consectur",
            link: "link",
            dataProcesso: "DD/MM/AAAA",
            titulo: "Processo 3"
        }, {
            descricao: "Lorem ipsum dolor sit amet consectur",
            link: "link",
            dataProcesso: "DD/MM/AAAA",
            titulo: "Processo 4"
        }]

        this.projetos = [{
            descricao: "Lorem ipsum dolor sit amet consectur",
            dataProjeto: "DD/MM/AAAA",
            titulo: "Projeto 1"
        }, {
            descricao: "Lorem ipsum dolor sit amet consectur",
            dataProjeto: "DD/MM/AAAA",
            titulo: "Projeto 2"
        }, {
            descricao: "Lorem ipsum dolor sit amet consectur",
            dataProjeto: "DD/MM/AAAA",
            titulo: "Projeto 3"
        }, {
            descricao: "Lorem ipsum dolor sit amet consectur",
            dataProjeto: "DD/MM/AAAA",
            titulo: "Projeto 4"
        }]
    }

    left() {
        if (this.aba == "visaoGeral") {
            this.aba = "historico";
        } else if (this.aba == "historico") {
            this.aba = "processos";
        } else if (this.aba == "processos") {
            this.aba = "projetos";
        }
    }

    right() {
        if (this.aba == "projetos") {
            this.aba = "processos";
        } else if (this.aba == "processos") {
            this.aba = "historico";
        } else if (this.aba == "historico") {
            this.aba = "visaoGeral";
        }
    }

    obterProcesso() {
        var processo = Parse.Object.extend('Processo');
        var query = new Parse.Query(Politico);
        query.equalTo("objectId", this.politico.id);
        query.first().then(function (result) {
            return result;
        }).then(function (result) {
            var query = new Parse.Query(processo);
            query.equalTo("politico", result);
            query.find().then(function (results) {
                var processos: Processo[] = [];
                for (var i = 0; i < results.length; i++) {
                    var processo: Processo;
                    processo = {
                        descricao: results[0].get("descricao"),
                        link: results[0].get("link"),
                        dataProcesso: results[0].get("dataProcesso"),
                        titulo: results[0].get("titulo")
                    }
                    processos.push(processo);
                    console.log(results[i]);
                }
                return processos;
            }).then(function (processos) {
                console.log(processos);
            })
        })
    }

    // gerarPoliticos() {
    //     var Politico = Parse.Object.extend('Politico', 'Partido');
    //     var query = new Parse.Query(Politico);
    //     query.include('partido');
    //     query.equalTo("id", );
    //     query.find().then(function (results) {
    //         var politicos: Politico[] = [];
    //         for (var i = 0; i < results.length; i++) {
    //             var politico: Politico;
    //             politico = {
    //                 nome: results[i].get('nome'),
    //                 sexo: ((results[i].get('sexo') == 'F') ? 'Feminino' : 'Masculino'),
    //                 telefone: results[i].get('telefone'),
    //                 gabinete: results[i].get('gabinete'),
    //                 partido: results[i].get('partido').get('sigla'),
    //                 partidofoto: results[i].get('partido').get('logo').url(),
    //                 site: results[i].get('site'),
    //                 cidade: results[i].get('cidade'),
    //                 escolaridade: results[i].get('escolaridade'),
    //                 projeto: results[i].get('projeto'),
    //                 processo: results[i].get('processo'),
    //                 popularidade: results[i].get('popularidade'),
    //                 anexo: results[i].get('anexo'),
    //                 status: results[i].get('status'),
    //                 foto: results[i].get("fotoCard").url(),
    //                 dataNascimento: results[i].get('dataNascimento'),
    //                 linkpolitico: results[i].get('linkpolitico'),
    //                 numero: results[i].get('numero'),
    //                 email: results[i].get('email'),
    //                 apelido: results[i].get('apelido'),
    //                 ocupacao: results[i].get('ocupacao'),
    //                 fotoCapa:
    //             }
    //             politicos.push(politico);
    //         }
    //         return politicos;
    //     }).then(politicos => {
    //         this.politico = politicos;
    //     });
    // }


}