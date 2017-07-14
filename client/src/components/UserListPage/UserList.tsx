import * as React from "react"
import UserTable from './UserTable'
import * as $ from 'jquery'
export class UserList extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			userData: []
		};
	}

	componentWillMount() {
		fetch('/api/userlist')
			.then(response => response.json())
			.then(userlist => this.setState({
				userData: userlist
			}));
	}

	render() {
		return (
			<div className="container">
				<div style={{ paddingTop: 100 }}>
					<UserTable userDataList={this.state.userData} />
				</div>
			</div>
		);
	}
}
