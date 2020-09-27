import React, {useState, useEffect} from 'react';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph'
import './Table.css';
import { sortData,prettyPrintStat } from './util';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const[mapZoom, setMapZoom] = useState(3);
  const [mapCenter, setMapCenter] = useState({lat: 34.87646, lng:-40.4796});
  const[mapCountries, setMapCountries] = useState([]);
  const[casesType, setCasesType] = useState('casesPerOneMillion');
  const[graphCasesType, setGraphCasesType] = useState('cases');
  const[headerText,setHeaderText] = useState('red');
  
  useEffect(()=> {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  }
  ,[]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data)=> {
        const countries = data.map((country) => (
          {
            name: country.country, //United States, United Kingdom
            value: country.countryInfo.iso2 //UK, USA, FR
          }));

          const sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
          setMapCountries(data);
          

      });
    };
    getCountriesData();
  }, []);

  const onCountryChange =  async (event) => {
    
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      //All of the countries data
      setCountryInfo(data);
      if(countryCode === 'worldwide') {
        
        setMapCenter({lat: 34.87646, lng:-40.4796})
        setMapZoom(1)
      }
      else {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(6);
      }
      
    });
    
  };

  // How to write a variable in react
  return (
    <div className="app">
      <div className="app__left">
        <div className={`app__header ${headerText === "red" && "app__header--red"} ${headerText === "green" && "app__header--green"} ${headerText === "black" && "app__header--black"}`}>
        <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
        variant="outlined"
        onChange = {onCountryChange}
        value={country}
        
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {
            countries.map(country => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
        </div>
        <div className="app__stats">
            <InfoBox  active={casesType === 'casesPerOneMillion'} isRed onClick={e => {setCasesType("casesPerOneMillion");setGraphCasesType('cases');setHeaderText('red')}} title="Coronavirus Cases today" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}></InfoBox>
            <InfoBox active={casesType === 'recoveredPerOneMillion'} onClick={e => {setCasesType('recoveredPerOneMillion'); setGraphCasesType('recovered'); setHeaderText('green')}} title="Recovered today" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
            <InfoBox active={casesType === 'deathsPerOneMillion'} isBlack  onClick={e => {setCasesType('deathsPerOneMillion');setGraphCasesType('deaths'); setHeaderText('black')}} title="Deaths today" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>
        </div>
        <div className='app__map'>
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}></Map>
          <div className="app__mapInfo">
          <p >select a circle to view per million stastistical information. </p>
          <p className="app__mapInfo--small">There is a bug!!! first selection on 'worldwide dropdown' does not render country location. Select another country and will start rendering properly</p>
          </div>
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
        <h3>Live cases by country</h3>
        <Table countries={tableData}></Table>
        <h3 className="app__graphTitle">Worldwide {(graphCasesType)}</h3>
        <LineGraph className='app__graph' graphCasesType={graphCasesType}></LineGraph> 
        </CardContent>
    
      </Card>
    </div>
  );
}

export default App;
