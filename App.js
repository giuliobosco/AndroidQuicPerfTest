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
			address: 'https://gb-lab03.cscs.ch',
			quicPort: 2016,
			tcpPort: 2017,
			page: 'index.html'
		};
	}

	_downloadTcp = () => {
		this.setState({tcpDownloadStartTime: Date.now()});
		var uri = this.state.address + ':' + this.state.tcpPort + '/' + this.state.page;
		FileSystem.downloadAsync(
			uri,
			FileSystem.documentDirectory + 'small_tcp.bin'
		).then(({uri}) => {
			this.setState({tcpDownloadEndTime: Date.now()})
		})
	};

	_downloadQuic = () => {
		this.setState({quicDownloadStartTime: Date.now()});
		var uri = this.state.address + ':' + this.state.quicPort + '/' + this.state.page;
		FileSystem.downloadAsync(
			uri,
			FileSystem.documentDirectory + 'small_quic.bin'
		).then(({uri}) => {
			this.setState({quicDownloadEndTime: Date.now()})
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