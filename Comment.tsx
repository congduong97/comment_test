import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';

export interface IComment {
  id: number;
  content: string;
  createdAt: number;
  score: number;
  username: string;
  replyingTo?: number;
  children?: Array<IComment>;
}

interface CommentProps {
  item: IComment;
  style?: ViewStyle;
  children?: JSX.Element;
}

const Comment = (props: CommentProps) => {
  const {item, style, children} = props;
  const childStyle = {
    paddingLeft: 32,
    paddingTop: 16,
    borderLeftWidth: 1,
    borderColor: '#dae6eb',
  };
  return (
    <View style={item.replyingTo !== undefined && childStyle}>
      <View style={[styles.container, style]}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.username}:</Text>
          <Text style={styles.score}>{item.score}</Text>
        </View>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.time}>
          {dayjs(item.createdAt).format('DD MMM')}
        </Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#dcf0f7',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#58aafc',
    marginLeft: 8,
  },
  content: {
    paddingVertical: 6,
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: '#7a7d80',
  },
});

export default Comment;
