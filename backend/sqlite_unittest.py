import unittest
import sqlite3

class TestDatabase(unittest.TestCase):
    def setUp(self):
        self.conn = sqlite3.connect('time_series_data.db')
        self.cursor = self.conn.cursor()

    def test_record_count(self):
        self.cursor.execute("SELECT COUNT(*) FROM device_data")
        count = self.cursor.fetchone()[0]
        self.assertGreater(count, 0)  # Assert that at least one record exists

    def tearDown(self):
        self.conn.close()

if __name__ == '__main__':
    unittest.main()