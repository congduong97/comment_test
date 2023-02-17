import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {mockData} from './data';
import Comment, {IComment} from './Comment';

function App(): JSX.Element {
  const [data, setData] = useState<Array<IComment>>([]);

  useEffect(() => {
    const modifyData = () => {
      let dataObj = {};
      let commentList = [];
      mockData.sort((a: IComment, b: IComment) => a.createdAt - b.createdAt);

      for (let index = 0; index < mockData.length; index++) {
        dataObj[mockData[index].id] = mockData[index];
        mockData[index].children = [];
      }

      for (let index = 0; index < mockData.length; index++) {
        if (mockData[index].replyingTo !== undefined) {
          dataObj[mockData[index].replyingTo].children.push(mockData[index]);
        } else {
          commentList.push(mockData[index]);
        }
      }
      setData(commentList);
    };
    modifyData();
    return () => {};
  }, []);

  const renderItem = ({item}: {item: IComment}) => {
    return (
      <Comment item={item}>
        <>
          {item.children &&
            item.children.map((comment: IComment, index: number) => (
              <React.Fragment key={index + ''}>
                {renderItem({item: comment})}
              </React.Fragment>
            ))}
        </>
      </Comment>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={data}
        ItemSeparatorComponent={<View style={styles.separator} />}
        renderItem={renderItem}
        keyExtractor={item => item.id + ''}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {
    padding: 16,
  },
  separator: {
    width: '100%',
    height: 16,
  },
});

export default App;
