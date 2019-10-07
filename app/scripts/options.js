import Config from './utils/config';
import { hideUser, unHideUser } from './utils/user';
import React from 'react';
import ReactDOM from 'react-dom';


class BlockedUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.options;

        this.setHiddenUsers = this.setHiddenUsers.bind(this);
        this.hideUser = this.hideUser.bind(this);
        this.userList = this.userList.bind(this);
    }

    setHiddenUsers(hiddenUsers) {
        this.setState({hiddenUsers: hiddenUsers});
    }

    hideUser(e) {
        let user = e.currentTarget.dataset.user;
        unHideUser(user, this.setHiddenUsers);
    }

    userList() {
        return this.state.hiddenUsers.map((user) => {
            return (
                    <li style={{padding : "0 5px"}}
                key={user}>
                    {user}
                    <a style={{padding: "0 3px", cursor: "pointer"}}
                data-user={user}
                onClick={this.hideUser}>(x)</a>
                </li>);
        });
    }

    render() {
        return (
                <ul>
                  {this.userList()}
                </ul>
        );
    }
}

class BlockUser extends React.Component {
    constructor(props) {
        super(props);
        this.blockedUserComponent = props.blockedUserComponent;
        this.state = {value: ""};

        this.handleChange = this.handleChange.bind(this);
        this.hideUser = this.hideUser.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    hideUser(e) {
        hideUser(this.state.value, this.blockedUserComponent.setHiddenUsers);
    }

    render() {
        return (
                <form onSubmit={this.hideUser}>
                  <label>
                   Block User:
                   <input type="text" value={this.state.value} onChange={this.handleChange} />
                  </label>
                  <input type="submit" value="Add" />
                </form>
        );
    }
}

function restoreOptions(settings) {
    let ctrUserList = document.querySelector(".ctrHiddenUsers");
    let blockedUserComponent = <BlockedUsers options={settings}/>;

    ReactDOM.render(blockedUserComponent, ctrUserList);

    let ctrUserForm = document.querySelector(".ctrUserForm");
    ReactDOM.render(<BlockUser blockedUserComponent={blockedUserComponent}/>, ctrUserForm);
}

document.addEventListener('DOMContentLoaded', () => {
    Config.getConfig(undefined, (settings) => {
        restoreOptions(settings);
    });
});
