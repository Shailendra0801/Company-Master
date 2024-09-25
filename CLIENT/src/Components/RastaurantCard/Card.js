// Card.js

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import useRestaurantContext from "../Hooks/useRestaurant";
import { useEffect, useState } from "react";
import axios from "axios";

function CardItem() {
    const { location, rating, selectedItems } = useRestaurantContext();
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        getAllRestaurants();
    }, [location, rating, selectedItems]);

    const getAllRestaurants = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/restaurants", {
                location: location,
                rating: rating,
                cuisines: selectedItems,
            });
            console.log("response is", response);
            if (response.data.success) {
                setRestaurants(response.data.data);
            }
        } catch (error) {
            console.log("error is", error);
        }
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "2vw" }}>
            {restaurants.map((item) => (
                <Card key={item.id} style={{ width: "18rem", marginLeft: "4vw", marginTop: "4vh" }}>
                    <Card.Img
                        variant="top"
                        src={item.image}
                        style={{ height: "20vh", objectFit: "cover" }}
                    />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            Types of food we offer:{" "}
                            {item.cuisines?.map((foodItem) => foodItem + ", ")}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Address: {item.address}</ListGroup.Item>
                        <ListGroup.Item>City: {item.location}</ListGroup.Item>
                        <ListGroup.Item>Rating: {item.rating}</ListGroup.Item>
                    </ListGroup>
                </Card>
            ))}
        </div>
    );
}

export default CardItem;
