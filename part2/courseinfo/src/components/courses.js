import React from 'react';

const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};

const Total = ({ courses }) => {
    console.log(courses);
    const sum = courses.reduce(
        (acc, cur) => (!!acc?.exercises ? acc.exercises : acc) + cur.exercises
    );
    return (
        <p>
            <strong>Number of exercises {sum}</strong>
        </p>
    );
};

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

const Content = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => {
                return (
                    <Part
                        key={course.id}
                        name={course.name}
                        exercises={course.exercises}
                    />
                );
            })}
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content courses={course.parts} />
            <Total courses={course.parts} />
        </>
    );
};

export const Courses = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    );
};
