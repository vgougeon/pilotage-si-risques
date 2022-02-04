import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [risks, _setRisks] = useState([])
  const setRisks = (value) => {
    _setRisks(value)
    localStorage.setItem('risks', JSON.stringify(value))
  }
  const add = () => { setRisks([...risks, { description: '', impact: 0, probability: 0 }]) }
  const rem = (risk) => { setRisks(risks.filter(r => r !== risk)) }
  const set = (id, attr, value) => {
    const temp = risks
    temp[id][attr] = value
    setRisks(temp)
    setArr([0, 1, 2, 3])
  }
  useEffect(() => {
    const ls = localStorage.getItem("risks")
    if (Array.isArray(JSON.parse(ls))) {
      setRisks(JSON.parse(ls))
    }
  }, [])
  const [arr, setArr] = useState([0, 1, 2, 3])
  const colors = ['yellow', 'yellow', 'orange', 'orange', 'orangered', 'red', 'red']
  const impacts = ['Mineur', 'Majeur', 'Grave', 'Catastrophique']
  const probabilities = ['Improbable', 'Peu probable', 'Probable', 'Très probable']
  return (
    <>
      <table style={{ width: '100vw' }}>
        <thead>
          <tr>
            <th>RD</th>
            <th>Description</th>
            <th>Impact</th>
            <th>Probabilité</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk, i) =>
            <tr>
              <td>R{i} <button onClick={() => rem(risk)}>-</button></td>
              <td><input style={{ width: '100%'}}
              defaultValue={risk.description} type="text" onChange={(event) => set(i, 'description', event.target.value)} /></td>
              <td>
                <select onChange={(event) => set(i, 'impact', event.target.value)}>
                  <option value="0" selected={risk.impact == 0}>Mineur</option>
                  <option value="1" selected={risk.impact == 1}>Majeur</option>
                  <option value="2" selected={risk.impact == 2}>Grave</option>
                  <option value="3" selected={risk.impact == 3}>Catastrophique</option>
                </select>
              </td>
              <td>
                <select onChange={(event) => set(i, 'probability', event.target.value)}>
                  <option value="0" selected={risk.impact == 0}>Improbable</option>
                  <option value="1" selected={risk.impact == 1}>Peu probable</option>
                  <option value="2" selected={risk.impact == 2}>Probable</option>
                  <option value="3" selected={risk.impact == 3}>Très probable</option>
                </select>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={add}>+</button>

      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {arr.map(imp =>
          <div style={{ display: 'flex' }}>
            <div style={{
              width: '50px', height: '150px', margin: '5px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', transform: 'rotateZ(-90deg)', textTransform: 'uppercase', fontWeight: 'bolder', fontSize: '14px'
            }}>
              {impacts[imp]}
            </div>
            {arr.map(pro =>
              <div
              style={{
                background: colors[pro + imp], width: '150px', height: '150px', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {risks
                  .map((risk, i) => ({ ...risk, id: i }))
                  .filter((risk) => risk.impact == imp && risk.probability == pro).map(risk =>
                    <span style={{ fontSize: 20, marginLeft: 5, marginRight: 5, fontWeight: 'bold' }}>R{risk.id}</span>
                  )}
              </div>
            )}
          </div>
        )}
        <div style={{ display: 'flex' }}>
          <div style={{
            width: '50px', height: '20px', margin: '5px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', transform: 'rotateZ(-90deg)', textTransform: 'uppercase', fontWeight: 'bolder', fontSize: '14px'
          }}>
          </div>
          <div style={{
            width: '150px', height: '50px', margin: '5px', display: 'flex', alignItems: 'end',
            justifyContent: 'center', textTransform: 'uppercase', fontWeight: 'bolder', fontSize: '14px'
          }}>
            {probabilities[0]}
          </div>
          <div style={{
            width: '150px', height: '50px', margin: '5px', display: 'flex', alignItems: 'end',
            justifyContent: 'center', textTransform: 'uppercase', fontWeight: 'bolder', fontSize: '14px'
          }}>
            {probabilities[1]}
          </div>
          <div style={{
            width: '150px', height: '50px', margin: '5px', display: 'flex', alignItems: 'end',
            justifyContent: 'center', textTransform: 'uppercase', fontWeight: 'bolder', fontSize: '14px'
          }}>
            {probabilities[2]}
          </div>
          <div style={{
            width: '150px', height: '50px', margin: '5px', display: 'flex', alignItems: 'end',
            justifyContent: 'center', textTransform: 'uppercase', fontWeight: 'bolder', fontSize: '14px'
          }}>
            {probabilities[3]}
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
