package model;

import java.util.ArrayList;

import org.apache.struts.action.ActionForm;

public class HomeActionForm extends ActionForm {
	private String slogan;
	private String logo;
	private String copyright;
	ArrayList<CategoryDTO> categories;
	ArrayList<FlowerDTO> flowers;
	public HomeActionForm(String slogan, String logo, String copyright, ArrayList<CategoryDTO> categories,
			ArrayList<FlowerDTO> flowers) {
		super();
		this.slogan = slogan;
		this.logo = logo;
		this.copyright = copyright;
		this.categories = categories;
		this.flowers = flowers;
	}
	/**
	 * @return the slogan
	 */
	public String getSlogan() {
		return slogan;
	}
	/**
	 * @param slogan the slogan to set
	 */
	public void setSlogan(String slogan) {
		this.slogan = slogan;
	}
	/**
	 * @return the logo
	 */
	public String getLogo() {
		return logo;
	}
	/**
	 * @param logo the logo to set
	 */
	public void setLogo(String logo) {
		this.logo = logo;
	}
	/**
	 * @return the copyright
	 */
	public String getCopyright() {
		return copyright;
	}
	/**
	 * @param copyright the copyright to set
	 */
	public void setCopyright(String copyright) {
		this.copyright = copyright;
	}
	/**
	 * @return the categories
	 */
	public ArrayList<CategoryDTO> getCategories() {
		return categories;
	}
	/**
	 * @param categories the categories to set
	 */
	public void setCategories(ArrayList<CategoryDTO> categories) {
		this.categories = categories;
	}
	/**
	 * @return the flowers
	 */
	public ArrayList<FlowerDTO> getFlowers() {
		return flowers;
	}
	/**
	 * @param flowers the flowers to set
	 */
	public void setFlowers(ArrayList<FlowerDTO> flowers) {
		this.flowers = flowers;
	}
	

}
