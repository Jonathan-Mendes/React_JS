import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import {
    Button, Label, FormGroup, Form, Col, Row, Input, Container, Table,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class gestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datePag: '',
            solicitacoes: [],
            dateAnt: '',
            numNotAnt: ''
        };
        this.aceitar = this.aceitar.bind(this)
        this.negar = this.negar.bind(this)
    }

    componentDidMount() {

        firebase.app.ref('solicitacoes').on('value', (snapshot) => {
            let state = this.state;
            state.solicitacoes = [];
            snapshot.forEach((childItem) => {
                state.solicitacoes.push({
                    key: childItem.key,
                    numNotAnt: childItem.val().numNotAnt,
                    datePag: childItem.val().datePag,
                    dateAnt: childItem.val().dateAnt
                })
            })
            this.setState(state);
        })
    }

    solicitarAnt = async () => {
        try {
            const { dateAnt, numNotAnt } = this.state;
            await firebase.solicitaAntecipacao(dateAnt, numNotAnt);
        } catch (error) {
            alert("error.message");
        }
    }

    aceitar = async (e) => {
        let ref = firebase.app.ref('notas');
        try {
            await ref.child(e.numNotAnt).update({
                datePag: e.dateAnt
            });
            this.deleteSolicitacoes(e.key)
        } catch (error) {
            alert("error.message");
        }
    }


    deleteSolicitacoes = async (key) => {
        try {
            await firebase.deleteSolicitacoes(key);
        } catch (error) {
            alert(error.message);
        }
    }

    negar = async (e) =>  {
        this.deleteSolicitacoes(e.key)
    }

    render() {
        return (
            <div>
                <h1>Gestor</h1>
                <Link to={{ pathname: "/" }}> Home </Link>

                <Row>
                    <Col md='12'>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="text-center text-white">Número da Nota</th>
                                    <th className="text-center text-white">Data do Pagamento</th>
                                    <th className="text-center text-white">Data Solicitada para Antecipação</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.solicitacoes.map((solicitacao) => {
                                    return (
                                        <tr>
                                            <td className="text-center text-white font-weight-bold">{solicitacao.numNotAnt}</td>
                                            <td className="text-center text-white font-weight-bold">{solicitacao.datePag}</td>
                                            <td className="text-center text-white font-weight-bold">{solicitacao.dateAnt}</td>
                                            <td>
                                                <Button outline color="success" onClick={(e) => this.aceitar(solicitacao)}>Aceitar</Button>
                                            </td>
                                            <td>
                                                <Button outline color="danger" onClick={(e) => this.negar(solicitacao)}>Negar</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default gestor;
