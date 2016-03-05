package model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.CategoryDTO;
import model.FlowerDTO;
import util.DBConnection;

public class FlowerDAO {
	public static ArrayList<FlowerDTO> getAll() throws SQLException {
		ArrayList<FlowerDTO> ketqua = new ArrayList<>();
		Connection connection = DBConnection.getConnection();
		String sql = "select id,name,description, image, price"
				+ " from flower as f inner join flowercategorydetail as d on f.id = d.flowerid "
				+ "where d.categoryid=1";
		PreparedStatement preStatement = connection.prepareStatement(sql);
		ResultSet re = preStatement.executeQuery();
		while (re.next()) {
			String id = re.getString("id");
			String name = re.getString("name");
			String description = re.getString("description");
			String image = re.getString("image");
			String price = re.getString("price");
			FlowerDTO f = new FlowerDTO(id, name, description, image, price);
			ketqua.add(f);
		}
		return ketqua;
	}

	public static ArrayList<FlowerDTO> getByCategory(String categoryId) throws SQLException {
		ArrayList<FlowerDTO> ketqua = new ArrayList<>();
		Connection connection = DBConnection.getConnection();
		String sql = "select name,description, image, price"
				+ " from flower as f inner join flowercategorydetail as d on f.id = d.flowerid " + "where d.categoryid="
				+ categoryId + "";
		PreparedStatement preStatement = connection.prepareStatement(sql);
		ResultSet re = preStatement.executeQuery();
		while (re.next()) {
			String id = re.getString("id");
			String name = re.getString("name");
			String description = re.getString("description");
			String image = re.getString("image");
			String price = re.getString("price");
			FlowerDTO f = new FlowerDTO(id, name, description, image, price);
			ketqua.add(f);
		}
		return ketqua;

	}

	public static FlowerDTO getByID(String flowerid) throws SQLException {
		FlowerDTO f = null;
		Connection connection = DBConnection.getConnection();
		String sql = "select * from flower as f where f.id=" + flowerid + "";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet re = preparedStatement.executeQuery();
		if (re.next()) {
			String id = re.getString("id");
			String name = re.getString("name");
			String description = re.getString("description");
			String image = re.getString("image");
			String price = re.getString("price");
			f = new FlowerDTO(id, name, description, image, price);
		}
		return f;

	}

}
