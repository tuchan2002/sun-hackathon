import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const DoFlashcard = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <h3>Flashcard</h3>
            <h2>Flashcard Title</h2>
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                indicators={false}
                style={{ width: "500px", margin: "auto" }}
            >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1280px-A_black_image.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption style={{ marginBottom: "128px" }}>
                        <h3>First slide label</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        alt="Second slide"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1280px-A_black_image.jpg"
                    />
                    <Carousel.Caption style={{ marginBottom: "128px" }}>
                        <h3>Second slide label</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        alt="Third slide"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1280px-A_black_image.jpg"
                    />
                    <Carousel.Caption style={{ marginBottom: "128px" }}>
                        <h3>Third slide label</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default DoFlashcard;
