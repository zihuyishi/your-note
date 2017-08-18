import React from 'react';
import UserDao from '../net/UserDao';
import _ from 'lodash';

class WarningBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.warn) {
            return null;
        } else {
            return (
                <div className='warning'>
                    {this.props.warn}
                </div>
            );
        }
    }
}

class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            warning: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(event) {
        const targetName = event.target.name;
        if (targetName === 'email') {
            this.setState({email: event.target.value});
        } else if (targetName === 'password') {
            this.setState({password: event.target.value});
        }
    }


    login() {
        if (this.state.email.length === 0 ||
            this.state.password.length === 0) {
            this.setState({warning: '用户名或密码为空'});
            return ;
        }

        UserDao.login(this.state.email, this.state.password).then(user => {
            alert(`${user.email} login`);
        });
    }

    render() {
        return (
            <div class='login_panel'>
                <form>
                    <WarningBanner warn={this.state.warning}/>
                    <label>
                        邮箱
                        <input class='login_panel_input' name='email' value={this.state.email} onChange={this.handleChange}/>
                    </label>
                    <label>
                        密码
                        <input class='login_panel_input' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input class='login_panel_button' type='submit' value='登录' onClick={this.login} />
                </form>
            </div>
        );
    }    
}

export default LoginPanel;