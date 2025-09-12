import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const Home = () => {
  // Sample data for Recents
  const recents = [
    {
      id: '124',
      title: 'Add Two Numbers',
      description: 'You are given two non-empty linked lists representing two non-negative integers...',
    },
    {
      id: '125',
      title: 'Median of Two',
      description: 'Given two non-empty arrays, return the median of the two sorted arrays respectively...',
    },
  ];

  // Sample data for Categories
  const categories = [
    { id: '1', title: 'JavaScript Basics', icon: 'JS' },
    { id: '2', title: 'SQL', icon: 'SQL' },
    { id: '3', title: 'Frontend with...', icon: 'Frontend' },
    { id: '4', title: 'MongoDB', icon: 'MongoDB' },
    { id: '5', title: 'Build Server with...', icon: 'Build' },
    { id: '6', title: 'Docker', icon: 'Docker' },
  ];

  // Sample data for Assigned To You
  const assignedProblems = [
    { id: '127', title: 'Two Sum', status: 0, accRate: '0%', difficulty: 'Medium', time: '0 min', likes: 0 },
    { id: '128', title: 'Three Sum', status: 0, accRate: '0%', difficulty: 'Hard', time: '0 min', likes: 0 },
    { id: '131', title: 'Merge Two Sorted Lists', status: 0, accRate: '0%', difficulty: 'Easy', time: '0 min', likes: 0 },
    { id: '129', title: 'Reverse Linked List', status: 0, accRate: '0%', difficulty: 'Easy', time: '0 min', likes: 0 },
    { id: '130', title: 'Valid Parentheses', status: 0, accRate: '0%', difficulty: 'Easy', time: '0 min', likes: 0 },
  ];

  return (
    <View style={styles.container}>
      {/* Recents Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recents</Text>
        {recents.map((item) => (
          <TouchableOpacity key={item.id} style={styles.recentCard}>
            <Text style={styles.recentTitle}>{item.title}</Text>
            <Text style={styles.recentDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.resumeButton}>
              <Text style={styles.resumeText}>Resume Coding</Text>
              <Text style={styles.recentId}>#{item.id}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <TouchableOpacity key={item.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Assigned To You Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assigned To You</Text>
        <View style={styles.filterBar}>
          <Text style={styles.filterText}>All Problems</Text>
          <Text style={styles.filterText}>Difficulty</Text>
          <Text style={styles.filterText}>All Subjects</Text>
        </View>
        <FlatList
          data={assignedProblems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.problemItem}>
              <View style={styles.problemInfo}>
                <Text style={styles.problemId}>ID {item.id}</Text>
                <Text style={styles.problemStatus}>{item.status === 0 ? '○' : '●'}</Text>
                <Text style={styles.problemTitle}>{item.title}</Text>
              </View>
              <View style={styles.problemDetails}>
                <Text style={styles.problemDetail}>Info</Text>
                <Text style={styles.problemDetail}>{item.accRate}</Text>
                <Text style={styles.problemDetail}>{item.difficulty}</Text>
                <Text style={styles.problemDetail}>{item.time}</Text>
                <Text style={styles.problemDetail}>Likes {item.likes}</Text>
              </View>
            </View>
          )}
          style={styles.problemList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  recentTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentDescription: {
    color: '#ccc',
    fontSize: 12,
    marginVertical: 5,
  },
  resumeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resumeText: {
    color: '#007AFF',
    fontSize: 14,
  },
  recentId: {
    color: '#fff',
    fontSize: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#2a2a2a',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 5,
  },
  categoryText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterText: {
    color: '#007AFF',
    fontSize: 14,
  },
  problemList: {
    flexGrow: 0,
  },
  problemItem: {
    backgroundColor: '#2a2a2a',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'column',
  },
  problemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  problemId: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  problemStatus: {
    color: '#ccc',
    fontSize: 14,
    marginRight: 10,
  },
  problemTitle: {
    color: '#fff',
    fontSize: 14,
  },
  problemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  problemDetail: {
    color: '#ccc',
    fontSize: 12,
  },
});

export default Home;