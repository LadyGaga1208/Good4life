import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import HeaderPart from '../../components/HeaderPart';
import Loading from '../../components/Loading';
import LoadMore from '../../components/LoadMore';
import { screenHeight, screenWidth, backgroundColorItem } from '../../styles/variables';
import { url } from '../../api/ApiService';


const iconStore = require('../../images/icons/storeFollow.png');

class Store extends PureComponent {

    goToStoreDetail(item) {
        const navigateTabCatalogues = NavigationActions.navigate({
            routeName: 'TabStoreDetail',
            params: { data: item }
        });
        this.props.navigation.dispatch(navigateTabCatalogues);
    }

    goToStoreSuggest() {
        const navigateStoreSuggest = NavigationActions.navigate({
            routeName: 'Store',
            action: NavigationActions.navigate({ routeName: 'Gợi ý' })
        });
        this.props.navigation.dispatch(navigateStoreSuggest);
    }

    renderItemStore({ item }) {
        const { wrapItem, img } = styles;
        return (
            <TouchableWithoutFeedback onPress={this.goToStoreDetail.bind(this, item)}>
                <View style={wrapItem} >
                    <Image style={img} source={{ uri: `${url}/store/${item.storeId}/icon.png` }} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderListFooterComponent() {
        const { loadMore } = styles;
        return (
            <LoadMore style={loadMore} onPress={this.goToStoreSuggest.bind(this)} />
        );
    }

    render() {
        const { container } = styles;
        const { dataHome, isLoading } = this.props;
        return (
            <View style={container}>
                <HeaderPart source={iconStore} name='Danh sách cửa hàng' />
                {isLoading ? <Loading style={styles.indicator} /> : (
                    <FlatList
                        data={dataHome.suggestStores}
                        keyExtractor={(item) => item.storeId.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderItemStore.bind(this)}
                        ListFooterComponent={this.renderListFooterComponent.bind(this)}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    },
    indicator: {
        height: 0.55 * ((1 / 3) * screenHeight),
    },
    wrapItem: {
        height: 0.55 * ((1 / 3) * screenHeight),
        width: 0.35 * screenWidth,
        backgroundColor: backgroundColorItem,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        margin: 5
    },
    img: {
        height: 0.5 * ((1 / 3) * screenHeight),
        resizeMode: 'stretch',
    },
    loadMore: {
        height: 0.55 * ((1 / 3) * screenHeight),
        width: (0.35 * screenWidth) / 2,
    },
});

const mapStateToProps = (state) => ({
    dataHome: state.homeReducer.dataHome,
    isLoading: state.homeReducer.loading
});

export default connect(mapStateToProps)(Store);
