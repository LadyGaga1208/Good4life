import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { getDataSellingProduct } from '../../redux/action/getDataTabProduct';
import ItemProduct from '../../components/ItemProduct';
import Fillter from '../../components/Fillter';

import { url } from '../../api/ApiService';

class SellingProduct extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    componentDidMount() {
        this.props.getDataSellingProduct(this.state.value);
    }


    handleEnd() {
        this.setState((previousState) => ({
            value: previousState.value + 1
        }), () => this.props.getDataSellingProduct(this.state.value));
    }

    goToProductDetail(item) {
        const navigateProductDetail = NavigationActions.navigate({
            routeName: 'ProductDetail',
            params: { data: item }
        });
        this.props.navigation.dispatch(navigateProductDetail);
    }

    showPopUp() {

    }

    renderItemNewProduct({ item }) {
        return (
            <ItemProduct
                imgProduct={`${url}/product/${item.productId}/${item.imagePath}.png`}
                price={item.unitPrice}
                nameProduct={item.productName}
                nameStore={item.storeName}
                love={item.likeCount}
                rate={item.ratingCount}
                onPress={this.goToProductDetail.bind(this, item)}
            />
        );
    }

    render() {
        const { isLoading, dataSellingProduct } = this.props;
        return (
            <View style={styles.wrap}>
                <Fillter
                    show={this.showPopUp.bind(this)}
                />
                <View style={styles.container}>
                    {
                        isLoading ? <ActivityIndicator size='large' color='#008296' animating /> : (
                            <FlatList
                                data={dataSellingProduct}
                                keyExtractor={(item) => item.productId.toString()}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                renderItem={this.renderItemNewProduct.bind(this)}
                                onEndReached={() => this.handleEnd()}
                                onEndReachedThreshold={0.2}
                            />
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => ({
    dataSellingProduct: state.dataSellingProduct.dataSellingProduct,
    isLoading: state.dataSellingProduct.loading
});

const mapDispatchToProps = (dispatch) => ({
    getDataSellingProduct: (value) => {
        dispatch(getDataSellingProduct(value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SellingProduct);
