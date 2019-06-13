import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import * as FileSystem from 'expo-file-system';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tcpDownloadStartTime: '-1',
			tcpDownloadEndTime: '-1',
			quicDownloadStartTime: '-1',
			quicDownloadEndTime: '-1',
			address: 'http://gb-lab03.cscs.ch',
			quicPort: 2016,
			tcpPort: 2017,
			page: 'large.bin'
		};
	}

	_downloadTcp = () => {
		this.setState({tcpDownloadStartTime: Date.now()});
		let uri = this.state.address + ':' + this.state.tcpPort + '/' + this.state.page;
		let fileUri = FileSystem.documentDirectory + 'small_tcp.bin';
		FileSystem.downloadAsync(
			uri,
			fileUri
		).then(({uri}) => {
			this.setState({tcpDownloadEndTime: Date.now()});
			FileSystem.deleteAsync(fileUri);
		})
	};

	_downloadQuic = () => {
		this.setState({quicDownloadStartTime: Date.now()});
		let uri = this.state.address + ':' + this.state.quicPort + '/' + this.state.page;
		let fileUri = FileSystem.documentDirectory + 'small_quic.bin';
		FileSystem.downloadAsync(
			uri,
			fileUri
		).then(({uri}) => {
			this.setState({quicDownloadEndTime: Date.now()})
			FileSystem.deleteAsync(fileUri);
		});
	};

	render() {
		console.log(this.state);
		return (
			<View style={styles.container}>
				<Button onPress={this._downloadTcp} title="TCP"/>

				{this.state.tcpDownloadStartTime > 0 ?
					<Text>Start time:{this.state.tcpDownloadStartTime}</Text> : <View></View>}
				{this.state.tcpDownloadEndTime > 0 ?
					<View><Text>End time:{this.state.tcpDownloadEndTime}</Text><Text>Total
						time: {this.state.tcpDownloadEndTime - this.state.tcpDownloadStartTime}</Text></View> :
					<View></View>}

				<View style={{height:20}}></View>

				<Button onPress={this._downloadQuic} title="QUIC"/>
				{this.state.quicDownloadStartTime > 0 ?
					<Text>Start time:{this.state.quicDownloadStartTime}</Text> : <View></View>}
				{this.state.quicDownloadEndTime > 0 ?
					<View><Text>End time:{this.state.quicDownloadEndTime}</Text><Text>Total
						time: {this.state.quicDownloadEndTime - this.state.quicDownloadStartTime}</Text></View> :
					<View></View>}
			</View>
		);


	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});