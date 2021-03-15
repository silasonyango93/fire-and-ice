import React, {Component} from 'react';
import {promiselessApiGet} from "../services/api_connector/ApiConnector";
import Table from "../components/table/table_body/Table";
import {SERVER_BASE_URL} from "../config/EndPoint";

import NewWindow from 'react-new-window'
import TableHeader from "../components/table/table_header/TableHeader";
import TableRow from "../components/table/table_row/TableRow";

class Home extends Component {

    state = {
        characters: [],
        books: [],
        houses: [],
        charactersTableData: [],
        booksTableData: [],
        housesTableData: [],
        displayCharacterMoreDetails: false,
        displayBooksMoreDetails: false,
        displayHousesMoreDetails: false,
        currentCharacterPayload: '',
        currentBookPayload: '',
        currentHousePayload: ''
    };

    componentDidMount = async () => {
        const charactersResponse = await promiselessApiGet("/api/characters");
        const booksResponse = await promiselessApiGet("/api/books");
        const housesResponse = await promiselessApiGet("/api/houses");

        await this.setState({
            characters: charactersResponse.data,
            books: booksResponse.data,
            houses: housesResponse.data
        })

        await this.mapTablesData();
    };

    mapTablesData = async () => {
        let charactersList = this.state.characters.map((item, index) => {
            return {
                id: index + 1,
                name: item.name,
                gender: item.gender,
                culture: item.culture,
                born: item.born,
                alias: item.aliases.length ? item.aliases[0] : "",
                playedBy: item.playedBy.length ? item.playedBy[0] : "",
                payload: item
            };
        });

        let booksList = this.state.books.map((item, index) => {
            return {
                id: index + 1,
                name: item.name,
                authors: item.authors.length ? item.authors[0] : "",
                isbn: item.isbn,
                numberOfPages: item.numberOfPages,
                publisher: item.publisher,
                country: item.country,
                mediaType: item.mediaType,
                released: item.released,
                payload: item
            };
        });

        let housesList = this.state.houses.map((item, index) => {
            return {
                id: index + 1,
                name: item.name,
                region: item.region,
                coatOfArms: item.coatOfArms,
                currentLord: item.currentLord,
                words: item.words,
                payload: item
            };
        });

        await this.setState({
            charactersTableData: charactersList,
            booksTableData: booksList,
            housesTableData: housesList
        });
    };


    openCharactersMoreDetailsTab = async (payload) => {
        await this.setState({currentCharacterPayload: payload});
        await this.setState({displayCharacterMoreDetails: true});
    };

    openBooksMoreDetailsTab = async (payload) => {
        await this.setState({currentBookPayload: payload});
        await this.setState({displayBooksMoreDetails: true,displayCharacterMoreDetails: false});
    };

    openHousesMoreDetailsTab = async (payload) => {
        await this.setState({currentHousePayload: payload});
        await this.setState({displayHousesMoreDetails: true});
    };

    returnCharacterTable = () => {

        const {currentCharacterPayload} = this.state;

        return (
            <div>
                <table
                    width="100%"
                    className="table table-striped table-bordered table-hover"
                    id="dataTables-example"
                >
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{currentCharacterPayload.name}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>{currentCharacterPayload.gender}</td>
                    </tr>
                    <tr>
                        <th>Culture</th>
                        <td>{currentCharacterPayload.culture}</td>
                    </tr>
                    <tr>
                        <th>Aliases</th>
                        <td>{currentCharacterPayload.aliases.length ? currentCharacterPayload.aliases[0] : ""}</td>
                    </tr>
                    <tr>
                        <th>Born</th>
                        <td>{currentCharacterPayload.born}</td>
                    </tr>
                    <tr>
                        <th>Died</th>
                        <td>{currentCharacterPayload.died}</td>
                    </tr>
                    </tbody>
                </table>
            </div>);
    };


    returnBookTable = () => {

        const {currentBookPayload} = this.state;

        return (
            <div>
                <table
                    width="100%"
                    className="table table-striped table-bordered table-hover"
                    id="dataTables-example"
                >
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{currentBookPayload.name ? currentBookPayload.name : ''}</td>
                    </tr>
                    <tr>
                        <th>ISBN</th>
                        <td>{currentBookPayload.isbn}</td>
                    </tr>
                    <tr>
                        <th>Author</th>
                        <td>{currentBookPayload.authors.length ? currentBookPayload.authors[0] : ''}</td>
                    </tr>
                    <tr>
                        <th>No of Pages</th>
                        <td>{currentBookPayload.numberOfPages}</td>
                    </tr>
                    <tr>
                        <th>Publisher</th>
                        <td>{currentBookPayload.publisher}</td>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <td>{currentBookPayload.country}</td>
                    </tr>
                    <tr>
                        <th>Media Type</th>
                        <td>{currentBookPayload.mediaType}</td>
                    </tr>
                    <tr>
                        <th>Release Date</th>
                        <td>{currentBookPayload.released}</td>
                    </tr>
                    </tbody>
                </table>
            </div>);
    };


    returnHouseTable = () => {

        const {currentHousePayload} = this.state;

        return (
            <div>
                <table
                    width="100%"
                    className="table table-striped table-bordered table-hover"
                    id="dataTables-example"
                >
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{currentHousePayload.name ? currentHousePayload.name : ''}</td>
                    </tr>
                    <tr>
                        <th>Region</th>
                        <td>{currentHousePayload.region}</td>
                    </tr>
                    <tr>
                        <th>Court of Arms</th>
                        <td>{currentHousePayload.coatOfArms}</td>
                    </tr>
                    <tr>
                        <th>Words</th>
                        <td>{currentHousePayload.words}</td>
                    </tr>
                    <tr>
                        <th>Current Lord</th>
                        <td>{currentHousePayload.currentLord}</td>
                    </tr>
                    <tr>
                        <th>Founded</th>
                        <td>{currentHousePayload.founded}</td>
                    </tr>
                    <tr>
                        <th>Founder</th>
                        <td>{currentHousePayload.founder}</td>
                    </tr>
                    <tr>
                        <th>Died Out</th>
                        <td>{currentHousePayload.diedOut}</td>
                    </tr>
                    </tbody>
                </table>
            </div>);
    };



    render() {

        const {displayCharacterMoreDetails, charactersTableData, displayBooksMoreDetails, booksTableData, displayHousesMoreDetails, housesTableData} = this.state;

        const charactersTableHeaders = {
            columnZero: "#",
            columnOne: "Name",
            columnTwo: "Gender",
            columnThree: "Culture",
            columnFour: "DOB",
            columnFive: "Alias",
            columnSix: "Played By"
        };

        const booksTableHeaders = {
            columnZero: "#",
            columnOne: "Name",
            columnTwo: "Author",
            columnThree: "ISBN",
            columnFour: "No of Pages",
            columnFive: "Publisher",
            columnSix: "Country",
            columnSeven: "Media Type",
            columnEight: "Released"
        };

        const housesTableHeaders = {
            columnZero: "#",
            columnOne: "Name",
            columnTwo: "Region",
            columnThree: "Court of Arms",
            columnFour: "Current Lord",
            columnFive: "Words"
        };
        return (
            <div>
                <Table tableTitle="Characters" tableHeaderObject={charactersTableHeaders}
                       tableData={this.state.charactersTableData}
                       handleRowIsClicked={this.openCharactersMoreDetailsTab}/>
                <br/>
                <br/>
                <Table tableTitle="Books" tableHeaderObject={booksTableHeaders} tableData={this.state.booksTableData}
                       handleRowIsClicked={this.openBooksMoreDetailsTab}/>
                <br/>
                <br/>
                <Table tableTitle="Houses" tableHeaderObject={housesTableHeaders}
                       tableData={this.state.housesTableData} handleRowIsClicked={this.openHousesMoreDetailsTab}/>
                {displayCharacterMoreDetails && (<NewWindow>
                    {this.returnCharacterTable()}
                </NewWindow>)}
                {displayBooksMoreDetails && (<NewWindow>
                    {this.returnBookTable()}
                </NewWindow>)}
                {displayHousesMoreDetails && (<NewWindow>
                    {this.returnHouseTable()}
                </NewWindow>)}
            </div>
        );
    }
}

export default Home;
