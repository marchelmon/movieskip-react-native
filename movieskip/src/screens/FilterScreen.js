import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
//import { Font, AppLoading } from 'expo';
//import { Icon } from 'react-native-elements';
import { Switch } from 'react-native-switch';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
//import SectionedMultiSelect from 'react-native-sectioned-multi-select';
//import MultiSelect from 'react-native-multiple-select'

import * as actions from '../../actions/';

import { SCREEN_WIDTH, ALL_GENRES } from '../../assets/global_vars';
import Genre from '../components/Genre';

class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }


  /*

Hämta state från redux, lägg i state för screenen.
När filtret uppdateras ändras endast det lokala state
När skärmen lämnas "apply filter" jämför man det lokala state med redux state
Skiljer det sig kallar man action creatorn för UPDATE_FILTER med det lokala state som payload
Fast this.props.updateFilter(this.state);
Skiljer de sig inte går man bara tillbaka till home utan att content uppdateras

*/
  multiSliderValuesChange = (values) => {
    this.setState({
      yearFrom: values[0],
      yearTo: values[1]
    });
  }
  //LÄGG TILL genres !!!!
  updateFilter = () => {
    const {
      updateFilter,
      yearFrom,
      yearTo,
      popular,
      navigation
    } = this.state;
    const newFilter = { yearFrom, yearTo, popular }; //Lägg till genres!!!
    updateFilter(newFilter, () => {
      if (navigation.state.routeName === 'Filter') {
        navigation.navigate('Home');
      }
    });
  }

  togglePopular = () => {
    this.setState({ popular: !this.state.popular });
  }

  renderGenres() {
    return ALL_GENRES.map((genre) => {
      console.log(this.state.genres.findIndex(gen => gen.id === genre.id));
      if (this.state.genres.findIndex(gen => gen.id === genre.id) > -1) {
        return (
          <Genre
            key={genre.id}
            id={genre.id}
            name={genre.name}
            isActive
          />
        );
      }
      return (
        <Genre
          key={genre.id}
          id={genre.id}
          name={genre.name}
          isActive={false}
        />
      );
    });
  }

  renderYearSlider() {
    const { yearFrom, yearTo } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>{yearFrom === 1979 ? 'Super old' : yearFrom} - {yearTo}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MultiSlider
            selectedStyle={{
              backgroundColor: '#0f82f5',
            }}
            unselectedStyle={{
              backgroundColor: 'silver',
            }}
            values={[yearFrom, yearTo]}
            onValuesChange={this.multiSliderValuesChange}
            containerStyle={{
              height: 40
            }}
            trackStyle={{
              height: 10,
              backgroundColor: 'red',
            }}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40,
            }}
             sliderLength={SCREEN_WIDTH > 550 ? 500 : SCREEN_WIDTH - 50}
             //customMarker={}
             min={1979}
             max={2019}
          />
        </View>
      </View>
    );
  }

  renderPopularSwitch() {
    const { popular } = this.state;
    return (
      <Switch
        onValueChange={this.togglePopular}
        value={popular}
        circleSize={60}
        backgroundActive={'#0f82f5'}
        backgroundInactive={'#d3d3d3'}
        circleActiveColor={'#ffffff'}
        circleInActiveColor={'#ffffff'}
        renderInsideCircle={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.toggle, { color: popular ? '#0f82f5' : 'gray' }]}>Popular</Text>
            <Text style={[styles.toggle, { color: popular ? '#0f82f5' : 'gray' }]}>only</Text>
          </View>
        )}
        circleBorderWidth={0}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        {this.renderYearSlider()}
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          {this.renderGenres()}
        </View>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          {this.renderPopularSwitch()}
        </View>
        <View style={styles.container}>
          <Button
            title='Update filter'
            onPress={this.updateFilter}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  iconContainer: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center'
  },
  container: {
    height: 80,
    margin: 30,
  },
  sliders: {
    margin: 20,
    width: 280,
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  toggle: {
    fontSize: 10,
    fontWeight: 'bold'
  }
};

const mapStateToProps = (state) => {
  const { yearFrom, yearTo, popular, genres } = state.filter;
  return {
    yearFrom,
    yearTo,
    popular,
    genres
  };
};

export default connect(mapStateToProps, actions)(FilterScreen);
