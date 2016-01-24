package colltroller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import model.CategoryDTO;
import model.FlowerDTO;
import model.dao.CategoryDAO;
import model.dao.FlowerDAO;
import model.dao.SettingDAO;

public class InitHomePrevAction extends Action {

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// 1. Load header information
		String slogan = SettingDAO.getById(1);
		request.getSession().setAttribute("SLOGAN", slogan);
		String headerLogo = SettingDAO.getById(3);
		request.getSession().setAttribute("LOGOHEADER", headerLogo);
		// 2. Load Category
		ArrayList<CategoryDTO> categories = CategoryDAO.getAll();
		request.getSession().setAttribute("CATEGORY", categories);

		// 3. Load 9 flower
		ArrayList<FlowerDTO> flowers = FlowerDAO.getAll();
		request.getSession().setAttribute("FLOWER", flowers);
		// 4. Load footer
		String footer = SettingDAO.getById(2);
		request.getSession().setAttribute("FOOTER", footer);

		String initsuccess;
		return mapping.findForward("initsuccess");
	}

}
