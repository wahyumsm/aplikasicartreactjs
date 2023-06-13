import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Topbar = () => {
    return (
        <>
            {/* INI KOMPONEN NAVBAR KONTEN */}
            <Navbar bg="light" expand="lg">
                <Container style={{ justifyContent: "center" }}>
                    {/* Judul dari aplikasi */}
                    <Navbar.Brand href="#home">
                        Aplikasi Pesan Mesin Indo Tekhnik
                    </Navbar.Brand>


                </Container>
            </Navbar>
        </>
    );
};

export default Topbar;
