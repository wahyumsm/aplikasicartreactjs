import React, { useState } from "react";
import Topbar from "../component/Topbar";
import {
    Button,
    Card,
    Col,
    Container,
    ListGroup,
    Row,
    Stack,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { cartData, productData } from "../data/data";
import { add } from "../store/cart";

const ProductCard = ({ cart, addedProducts }) => {
    const product = productData.find((pro) => pro.id === cart.product_id) || {};
    const dispatch = useDispatch();

    function handleRemoveItem() {
        const id = cart.id;
        dispatch({
            type: "cart/delete",
            payload: {
                id: id,
            },
        });

        // Mengupdate data keranjang di localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }

    function handleAddProduct() {
        dispatch({
            type: "cart/addProduct",
            payload: {
                id: cart.product_id,
            },
        });

        // Menyimpan data keranjang ke localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const newCartItem = {
            id: cart.product_id,
            amount: 1,
            total: product.price,
        };
        cartItems.push(newCartItem);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    function handleAddItem() {
        const newAmount = cart.amount + 1;
        dispatch({
            type: "cart/update",
            payload: {
                id: cart.id,
                amount: newAmount,
            },
        });

        // Mengupdate data keranjang di localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === cart.id) {
                return {
                    ...item,
                    amount: newAmount,
                };
            }
            return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }


    function handleSubstractItem() {
        if (cart.amount === 0) {
            alert("Item tidak boleh kurang dari 0");
            return;
        }
        const newAmount = cart.amount - 1;
        dispatch({
            type: "cart/update",
            payload: {
                id: cart.id,
                amount: newAmount,
            },
        });

        // Mengupdate data keranjang di localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === cart.id) {
                return {
                    ...item,
                    amount: newAmount,
                };
            }
            return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }

    function handleAddProduct() {
        const newCartItem = {
            id: cartData.length + 1,
            product_id: cart.product_id,
            amount: 1,
            total: product.price,
        };
        dispatch(add(newCartItem));
        alert("Produk berhasil ditambahkan ke keranjang! Terima kasih telah memesan barang di PT.INDO TEKHNIK");

        // Menyimpan data keranjang ke localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(newCartItem);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    return (
        <Stack>
            <Row>
                <Col xs={3}>
                    <Card.Img src={product.image} />
                </Col>
                <Col xs={5}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.color && product.color[0]}</Card.Text>
                    <Card.Text>{product.sizes[0]}</Card.Text>
                    <Card.Link>
                        <Button
                            onClick={handleRemoveItem}
                            variant="danger"
                            size="sm"
                            className="me-3 mb-3"
                        >
                            BATAL Pesan
                        </Button>
                        <button
                            variant="danger"
                            size="sm"
                            className="me-3 mb-3"
                            disabled={addedProducts.includes(cart.product_id)}
                            onClick={handleAddProduct}
                        >
                            {addedProducts.includes(cart.product_id) ? "Product Added" : "Tambah Product"}
                        </button>
                    </Card.Link>
                </Col>
                <Col xs={4}>
                    <div className="float-right">
                        <Stack direction="horizontal" style={{ justifyContent: "flex-end" }}>
                            <Button
                                onClick={handleSubstractItem}
                                variant="danger"
                                style={{ width: 50 }}
                                size="sm"
                            >
                                -
                            </Button>
                            <Button variant="light" style={{ width: 50 }} size="sm">
                                {cart.amount}
                            </Button>
                            <Button
                                onClick={handleAddItem}
                                variant="primary"
                                style={{ width: 50 }}
                                size="sm"
                            >
                                +
                            </Button>
                        </Stack>
                        <p
                            style={{
                                marginTop: 100,
                                fontWeight: "bold",
                                textAlign: "right",
                            }}
                        >
                            RP. {cart.total}
                        </p>
                    </div>
                </Col>
            </Row>
        </Stack>
    );
};

const Cart = () => {
    const dispatch = useDispatch();
    const dataCart = useSelector((state) => state.cart);
    const [addedProducts, setAddedProducts] = useState([]);

    const totalAmount = dataCart.reduce((acc, curr) => acc + curr.total, 0);

    const handleRemoveItem = (cartId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: cartId });
    };

    const handleAddItem = (productId) => {
        const product = productData.find((product) => product.id === productId);
        const newCart = {
            id: Date.now(),
            product_id: productId,
            amount: 1,
            total: product.price,
        };
        dispatch({ type: "ADD_TO_CART", payload: newCart });
        setAddedProducts([...addedProducts, newCart]);
    };

    const handleDecreaseItem = (cartId) => {
        dispatch({ type: "DECREASE_ITEM", payload: cartId });
    };

    return (
        <div>
            <Topbar />
            <Container style={{ padding: 32 }}>
                <Row>
                    <Col md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Cart ({dataCart.length} item)</Card.Title>
                                {dataCart.map((cart) => {
                                    return (
                                        <>
                                            <ProductCard
                                                cart={cart}
                                                addedProducts={addedProducts}
                                                key={cart.id} 
                                            />

                                        </>
                                    );
                                })}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Total barang Alat berat</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex">
                                        <div className="me-auto">Harga</div>
                                        <div>Rp.{totalAmount}</div>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="fw-bold d-flex">
                                        <div className="me-auto">Total yang dibayar</div>
                                        <div>Rp.{totalAmount}</div>
                                    </ListGroup.Item>
                                </ListGroup>
                                <div className="d-grid mt-3">
                                    <Button variant="primary">CheckOut</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Cart;