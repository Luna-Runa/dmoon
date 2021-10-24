import React from 'react'
import { Card } from 'react-bootstrap'

const DiaryList = props => {

    return (
        <>
            {
                props.diary.map(function (data) {
                    return (
                        <Card style={{ width: '18rem', marginBottom: '0.5rem' }}>
                            <Card.Body>
                                <Card.Title>{data.mood}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{data.date}</Card.Subtitle>
                                <Card.Text>
                                    {data.todoBool ? "성공 " + data.todoText : "실패 " + data.todoText}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default DiaryList;
