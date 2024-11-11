import React, { useState, useEffect } from 'react';
import Form from 'Form';
import Summary from 'Summary';
import List from 'List';

function View({ activeView, list, handleViewChange }) {
  const [activeView, changeView] = useState({ activeView });
  const [todaysList, setList] = useState({ list });

  const today = new Date().getDay();
  console.log(today);

  if (activeView == 'dayview') {
    return (
      <>
        <h1>{today}</h1>
        <ul>
          <List list={list} />
        </ul>
      </>
    );
  } else if (activeView == 'addhabit') {
    return <HabitForm />;
  } else if (activeView == 'habitsummary') {
    return <Summary />;
  }
}
