import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';

class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  };
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({deals});
  }
  setCurrentDeal = dealId => {
    this.setState({
      currentDealId: dealId,
    });
  };
  unnsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    });
  };
  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  };
  
  render() {
    if (this.state.currentDealId) {
      return <DealDetail initialDealData={this.currentDeal()} onBack={this.unnsetCurrentDeal} />;
    }
    if (this.state.deals.length > 0) {
      return (
        <View>
          <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bakesale</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});

export default App;
